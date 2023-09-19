using AutoMapper;
using backend.Dao.Specification;
using backend.Dao.Specification.ResortSpec;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;
using backend.Dtos.ResortDtos;

namespace backend.BussinessLogic
{
    public class ResortBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        public ResortBusinessLogic(IUnitofWork _unitofWork, IMapper mapper)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
        }

        //list category
        public async Task<IReadOnlyList<Resorts>> SelectAllResorts()
        {
            var data = await unitofWork.Repository<Resorts>().GetAllAsync();

            return data;
        }

        //create category
        public async Task Create(Resorts resort)
        {
            if (resort is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }

            if (await IsResortsAddressDuplicate(resort.Address))
            {
                throw new BadRequestExceptions("Resorts Address is exist.");
            }

            await unitofWork.Repository<Resorts>().AddAsync(resort);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update resort
        public async Task Update(Resorts resort)
        {
            if (resort is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingResorts = await unitofWork.Repository<Resorts>().GetByIdAsync(resort.Id);

            if (existingResorts is null)
            {
                throw new NotFoundExceptions("not found");
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
            if (existingResorts == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Resorts>().Delete(existingResorts);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //get resort by id
        public async Task GetByResortId(int id)
        {
            var existingResorts = await unitofWork.Repository<Resorts>().GetByIdAsync(id);
            if (existingResorts == null)
            {
                throw new NotFoundExceptions("not found");
            }
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

            var spec = new SearchResortSpec(specParams);
            var resorts = await unitofWork.Repository<Resorts>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Resorts>, IReadOnlyList<ResortDto>>(resorts);
            var resortPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            var countSpec = new SearchResortSpec(specParams);
            var count = await unitofWork.Repository<Resorts>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<ResortDto>(specParams.PageIndex, specParams.PageSize, resortPage, count, totalPageIndex);

            return pagination;
        }
    }
}
