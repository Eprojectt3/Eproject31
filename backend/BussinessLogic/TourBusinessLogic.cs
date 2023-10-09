
using AutoMapper;
using backend.Dao.Specification.TourSpec;
using backend.Dao.Specification;
using backend.Dtos.TourDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using Microsoft.AspNetCore.Http;
using webapi.Dao.UnitofWork;
using webapi.Data;
using Microsoft.EntityFrameworkCore;
using backend.Dtos.HotelDtos;
using backend.Dtos.RestaurantDtos;
using backend.Dtos.StaffDtos;

namespace backend.BussinessLogic
{
    public class TourBusinessLogic
    {
        public IUnitofWork unitofWork;
        private ImageService Image;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IMapper mapper;
        private DataContext context;

        public TourBusinessLogic(IUnitofWork _unitofWork, ImageService imageService, IHttpContextAccessor httpContextAccessor, IMapper mapper ,DataContext context)
        {
            unitofWork = _unitofWork;
            Image = imageService;
            _httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
            this.context = context;
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
                    UrlImage = Image.GetUrlImage(tour.Name, "tour", httpRequest) // Gọi phương thức GetUrlImage11 cho từng bản ghi
                };

                result.Add(tourInfo);
            }
            return result;
        }

        //create tour
        public async Task Create(TourDto tourdto)
        {

            var tour = mapper.Map<TourDto, Tour>(tourdto);
            var Name_replace = tourdto.Name.Replace(" ", "-");
            var image_folder = Name_replace + "-" + tour.CreateDate;
            var images = Image.Upload_Image(image_folder, "tour", tourdto.fileCollection);
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
        public async Task Update(Tour_Update_Dto tourdto)
        {

            var tour = mapper.Map<Tour_Update_Dto, Tour>(tourdto);

            var existingTour = await unitofWork.Repository<Tour>().GetByIdAsync(tour.Id);

            if (existingTour is null)
            {
                throw new NotFoundExceptions("not found");
            }
            var Name_replace = tourdto.Name.Replace(" ", "-");
            var image_folder = Name_replace + "-" + existingTour.CreateDate;
            var images = Image.Update_Image(image_folder, existingTour.Name, "restaurant", tourdto.path, tourdto.fileCollection);
            images.Add("JPG.JPG");
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
        public async Task<string> Delete(int id)
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
            var Name_replace = existingTour.Name.Replace(" ", "-");
            var image_folder = Name_replace + "-" + existingTour.CreateDate;
            var delete_image = Image.DeleteImage(image_folder, "tour");
            return delete_image.ToString();
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
        public async Task<Pagination<TourPageDto>> SelectAllTourPagination(SpecParams specParams)
        {

            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var spec = new SearchTourSpec(specParams);
            var result = new List<TourPageDto>();
            int count = await unitofWork.Repository<Tour>().GetCountWithSpecAsync(spec);
            var tourPage = new List<Tour>();
            if (string.IsNullOrEmpty(specParams.Search) && specParams.Rating == null && specParams.Location == null)
            {
                tourPage = await context.Tour.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToListAsync();
            }
            else
            {
                var tours = await unitofWork.Repository<Tour>().GetAllWithAsync(spec);

                tourPage = tours.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            }
            foreach (var tour in tourPage)
            {
                var cat = context.Category.FirstOrDefault(l => l.Id == tour.category_id);
                var trans = context.Transportation.FirstOrDefault(l => l.Id == tour.Transportation_ID);
                var tourInfo = new TourPageDto
                {
                    Id = tour.Id,
                    Name = tour.Name,
                    Price = tour.Price,
                    category_Name = cat.Name,
                    Description = tour.Description,
                    quantity_limit = tour.quantity_limit,
                    Rating = tour.Rating, // Sử dụng giá trị mặc định nếu tour.Rating là null
                    Type = tour.Type, // Sử dụng giá trị mặc định nếu tour.Type là null
                    Range_time = tour.Range_time ?? 4, // Sử dụng giá trị mặc định nếu tour.Range_time là null
                    Discount = tour.Discount,
                    Transportation_Name = trans.Name,
                    Departure_location = tour.Departure_location,
                    UrlImage = Image.GetUrlImage(tour.Name, "tour", httpRequest)
                };
                result.Add(tourInfo);
            }
            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<TourPageDto>(specParams.PageIndex, specParams.PageSize, result, count, totalPageIndex);

            return pagination;

        }



    }
}
