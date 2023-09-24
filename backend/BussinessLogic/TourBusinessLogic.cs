
using AutoMapper;
using backend.Dao.Specification.TourSpec;
using backend.Dao.Specification;
using backend.Dtos.TourDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using Microsoft.AspNetCore.Http;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class TourBusinessLogic
    {
        public IUnitofWork unitofWork;
        private ImageService Image;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IMapper mapper;


        public TourBusinessLogic(IUnitofWork _unitofWork, ImageService imageService, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            unitofWork = _unitofWork;
            Image = imageService;
            _httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
        }

        //list tour
        public async Task<IEnumerable<object>> SelectAllTour()
        {
            var data = await unitofWork.Repository<Tour>().GetAllAsync();
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new List<object>();

            foreach (var tour in data)
            {
                var tourInfo = new
                {
                    tour.Id,
                    tour.Name,
                    tour.Price,
                    tour.category_id,
                    tour.Description,
                    tour.quantity_limit,
                    tour.Rating,
                    tour.Type,
                    tour.Range_time,
                    tour.Discount,
                    tour.Transportation_ID,
                    tour.Departure_location,
                    //Thêm các trường cần thêm
                    UrlImage = Image.GetUrlImage(tour.Name, "tour", httpRequest) // Gọi phương thức GetUrlImage cho từng bản ghi
                };

                result.Add(tourInfo);
            }
            return result;
        }

        //create tour
        public async Task Create(TourDto tourdto)
        {

            var tour = mapper.Map<TourDto, Tour>(tourdto);

            var images = Image.Upload_Image(tourdto.Name, "tour", tourdto.fileCollection);
            foreach (var image in images)
            {
                tour.AddImage(image);
            }
            await unitofWork.Repository<Tour>().AddAsync(tour);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
        public async Task CreateWithRating(Tour tour)
        {
            if (tour is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            var orderDetail = await unitofWork.Repository<OrderDetail>().GetAllAsync();
            if (orderDetail != null && orderDetail.Any())
            {
                var ratings = orderDetail.Select(od => od.Rating).ToList();

                if (ratings.Any())
                {
                    double averageRating = (double)ratings.Average();
                    tour.Rating = (int)averageRating;
                }
                else
                {
                    throw new BadRequestExceptions("Rating is null");
                }
            }
            await unitofWork.Repository<Tour>().AddAsync(tour);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }




        //update tour
        public async Task Update(TourDto tourdto)
        {

            var tour = mapper.Map<TourDto, Tour>(tourdto);

            var existingTour = await unitofWork.Repository<Tour>().GetByIdAsync(tour.Id);

            if (existingTour is null)
            {
                throw new NotFoundExceptions("not found");
            }
            var images = Image.Upload_Image(tourdto.Name, "tour", tourdto.fileCollection);
            foreach (var image in images)
            {
                tour.AddImage(image);
            }
            existingTour.UpdateDate = tour.UpdateDate;
            existingTour.CreateDate = tour.CreateDate;
            existingTour.UpdateBy = tour.UpdateBy;
            existingTour.CreateBy = tour.CreateBy;
            existingTour.IsActive = tour.IsActive;
            existingTour.Name = tour.Name;
            existingTour.Price = tour.Price;
            existingTour.category_id = tour.category_id;
            existingTour.Description = tour.Description;
            existingTour.image = tour.image;
            existingTour.quantity_limit = tour.quantity_limit;
            existingTour.Rating = tour.Rating;
            existingTour.Type = tour.Type;

            existingTour.Transportation_ID = tour.Transportation_ID;
            existingTour.Departure_location = tour.Departure_location;
            existingTour.Range_time = tour.Range_time;
            await unitofWork.Repository<Tour>().Update(existingTour);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete tour
        public async Task Delete(int id)
        {

            var existingTour = await unitofWork.Repository<Tour>().GetByIdAsync(id);
            if (existingTour == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Tour>().Delete(existingTour);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //get tour by id
        public async Task<object> GetByTourId(int id)
        {
            var existingTour = await unitofWork.Repository<Tour>().GetByIdAsync(id);
            if (existingTour == null)
            {
                throw new NotFoundExceptions("not found");
            }
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new
            {
                existingTour.Id,
                existingTour.Name,
                existingTour.Price,
                existingTour.category_id,
                existingTour.Description,
                existingTour.quantity_limit,
                existingTour.Rating,
                existingTour.Type,
                existingTour.Range_time,
                existingTour.Discount,
                existingTour.Transportation_ID,
                existingTour.Departure_location,
                //thêm cách cột còn lại
                urlImage = Image.GetUrlImage(existingTour.Name, "tour", httpRequest)
            };


            return result;
        }
        public async Task<Pagination<TourDto>> SelectAllTourPagination(TourSpecParams specParams)
        {

            var spec = new SearchTourSpec(specParams);
            var resorts = await unitofWork.Repository<Tour>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Tour>, IReadOnlyList<TourDto>>(resorts);
            var staffPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            var countSpec = new SearchTourSpec(specParams);
            var count = await unitofWork.Repository<Tour>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<TourDto>(specParams.PageIndex, specParams.PageSize, staffPage, count, totalPageIndex);

            return pagination;
        }



    }
}
