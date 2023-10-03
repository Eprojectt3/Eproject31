using AutoMapper;
using backend.Dao.Specification;
using backend.Dao.Specification.ResortSpec;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;
using backend.Dtos.ResortDtos;
using webapi.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.BussinessLogic
{
    public class ResortBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        private ImageService Image;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private DataContext context;

        public ResortBusinessLogic(IUnitofWork _unitofWork, IMapper mapper, ImageService Image, IHttpContextAccessor _httpContextAccessor , DataContext context)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
            this.Image = Image;
            this._httpContextAccessor = _httpContextAccessor;
            this.context = context;
        }

        //list resort
        public async Task<IEnumerable<object>> SelectAllResorts()
        {
            var data = await unitofWork.Repository<Resorts>().GetAllAsync();
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new List<object>();

            foreach (var resort in data)
            {
                var resortInfo = new
                {
                    resort.Id,
                    resort.Name,
                    resort.Price_range,
                    resort.Rating,
                    resort.LocationId,
                    resort.Description,
                    resort.Image,
                    resort.Address,
                    resort.PhoneNumber,
                    resort.Links,
                    UrlImage = Image.GetUrlImage(resort.Name, "resort", httpRequest) // Gọi phương thức GetUrlImage cho từng bản ghi
                };

                result.Add(resortInfo);
            }
            return result;
        }

        //create resort
        public async Task Create(ResortImageDto resortDto)
        {
            var resort = mapper.Map<ResortImageDto, Resorts>(resortDto);
            if (resort is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }

            if (await IsResortsAddressDuplicate(resort.Address))
            {
                throw new BadRequestExceptions("Resorts Address is exist.");
            }
            var images = Image.Upload_Image(resortDto.Name, "resort", resortDto.fileCollection);
            foreach (var image in images)
            {
                resort.AddImage(image);
            }
            await unitofWork.Repository<Resorts>().AddAsync(resort);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update resort
        public async Task Update(ResortImageDto resortDto)
        {
            var resort = mapper.Map<ResortImageDto, Resorts>(resortDto);
            if (resort is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingResorts = await unitofWork.Repository<Resorts>().GetByIdAsync(resort.Id);

            if (existingResorts is null)
            {
                throw new NotFoundExceptions("not found");
            }
            var images = Image.Upload_Image(resortDto.Name, "resort", resortDto.fileCollection);
            foreach (var image in images)
            {
                resort.AddImage(image);
            }
            existingResorts.UpdateDate = resort.UpdateDate;
            existingResorts.CreateDate = resort.CreateDate;
            existingResorts.UpdateBy = resort.UpdateBy;
            existingResorts.CreateBy = resort.CreateBy;
            existingResorts.Name = resort.Name;
            existingResorts.Address = resort.Address;
            existingResorts.Rating = resort.Rating;
            existingResorts.Description = resort.Description;
            existingResorts.Image = resort.Image;
            existingResorts.Price_range = resort.Price_range;
            existingResorts.PhoneNumber = resort.PhoneNumber;
            existingResorts.IsActive = resort.IsActive;
            existingResorts.LocationId = resort.LocationId;
            existingResorts.Links = resort.Links;
            if (await IsResortsAddressDuplicate(resort.Address))
            {
                throw new BadRequestExceptions("Resorts Address is exist.");
            }

            await unitofWork.Repository<Resorts>().Update(existingResorts);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete resort
        public async Task Delete(int id)
        {
            var existingResorts = await unitofWork.Repository<Resorts>().GetByIdAsync(id);
            var itineraryHaveResortId = await unitofWork.Repository<Itinerary>().GetAllWithAsync(new ResortDeleteItinerarySpec(id));
            if (existingResorts == null)
            {
                throw new NotFoundExceptions("not found");
            }
            foreach (var iteam in itineraryHaveResortId)
            {
                await unitofWork.Repository<Itinerary>().Delete(iteam);
            }
            await unitofWork.Repository<Resorts>().Delete(existingResorts);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //get resort by id
        public async Task<object> GetByResortId(int id)
        {
            var resort = await unitofWork.Repository<Resorts>().GetByIdAsync(id);
            if (resort == null)
            {
                throw new NotFoundExceptions("not found");
            }
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new
            {
                resort.Id,
                resort.Name,
                resort.Price_range,
                resort.Rating,
                resort.LocationId,
                resort.Description,
                resort.Image,
                resort.Address,
                resort.PhoneNumber,
                resort.Links,
                urlImage = Image.GetUrlImage(resort.Name, "resort", httpRequest)
            };
            return result;
        }

        //duplicate name
        private async Task<bool> IsResortsAddressDuplicate(string resortAddress)
        {
            // Sử dụng GetEntityWithSpecAsync để kiểm tra trùng lặp
            var duplicateResorts = await unitofWork
                .Repository<Resorts>()
                .GetEntityWithSpecAsync(new ResortByAddressSpecification(resortAddress));

            return duplicateResorts != null;
        }
        public async Task<Pagination<ResortDto>> SelectAllResortsPagination(SpecParams specParams)
        {

            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var spec = new SearchResortSpec(specParams);
            var result = new List<ResortDto>();
            int count = await unitofWork.Repository<Resorts>().GetCountWithSpecAsync(spec);
            var resortPage = new List<Resorts>();
            if (string.IsNullOrEmpty(specParams.Search) && string.IsNullOrEmpty(specParams.Location) && specParams.Rating == null)
            {
                resortPage = await context.Resorts.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToListAsync();
            }
            else
            {
                var resorts = await unitofWork.Repository<Resorts>().GetAllWithAsync(spec);

                resortPage = resorts.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            }
            foreach (var resort in resortPage)
            {
                var resortInfo = new ResortDto
                {
                    Id = resort.Id,
                    Name = resort.Name,
                    Price_range = resort.Price_range,
                    Rating = resort.Rating,
                    LocationId = resort.LocationId,
                    UrlImage = Image.GetUrlImage(resort.Name, "resort", httpRequest)
                };
                result.Add(resortInfo);
            }
            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<ResortDto>(specParams.PageIndex, specParams.PageSize, result, count, totalPageIndex);

            return pagination;
        }
    }
}
