using AutoMapper;
using backend.Dao.Specification;
using backend.Dao.Specification.HotelSpec;
using backend.Dao.Specification.LocationSpec;
using backend.Dao.Specification.RestaurantSpec;
using backend.Dtos.HotelDtos;
using backend.Dtos.LocationDtos;
using backend.Dtos.RestaurantDtos;
using backend.Dtos.TourDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using Microsoft.EntityFrameworkCore;
using webapi.Dao.UnitofWork;
using webapi.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend.BussinessLogic
{
    public class HotelBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        private ImageService Image;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private DataContext context;

        public HotelBusinessLogic(IUnitofWork _unitofWork, IMapper mapper , ImageService Image, IHttpContextAccessor _httpContextAccessor,DataContext dataContext)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
            this.Image = Image;
            this._httpContextAccessor = _httpContextAccessor;
            context = dataContext;
        }

        //list hotel
        public async Task<IEnumerable<object>> SelectAllHotel()
        {
            var data = await unitofWork.Repository<Hotel>().GetAllAsync();
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new List<object>();

            foreach (var hotel in data)
            {
                var hotelInfo = new
                {
                    hotel.Id,
                    hotel.Name,
                    hotel.Price_range,
                    hotel.Rating,
                    hotel.LocationId,
                    hotel.Description,
                    hotel.Image,
                    hotel.Address,
                    hotel.PhoneNumber,
                    hotel.Links,
                    UrlImage = Image.GetUrlImage(hotel.Name, "hotel", httpRequest) // Gọi phương thức GetUrlImage cho từng bản ghi
                };

                result.Add(hotelInfo);
            }
            return result;
        }

        //create hotel
        public async Task Create(HotelImageDto hotelDto)
        {
            var hotel = mapper.Map<HotelImageDto, Hotel>(hotelDto);
            if (hotel is null)
            {
                throw new NotFoundExceptions("Hotel not found");
            }

            if (await IsHotelAddressDuplicate(hotel.Address))
            {
                throw new BadRequestExceptions("Hotel Address is exist.");
            }
            

            var images = Image.Upload_Image(hotelDto.Name, "hotel", hotelDto.fileCollection);
            foreach (var image in images)
            {
                hotel.AddImage(image);
            }

            await unitofWork.Repository<Hotel>().AddAsync(hotel);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update hotel
        public async Task Update(HotelImageDto hotelDto)
        {
            var hotel = mapper.Map<HotelImageDto, Hotel>(hotelDto);
            if (hotel is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingHotel = await unitofWork.Repository<Hotel>().GetByIdAsync(hotel.Id);

            if (existingHotel is null)
            {
                throw new NotFoundExceptions("not found");
            }
            var images = Image.Upload_Image(hotelDto.Name, "hotel", hotelDto.fileCollection);
            foreach (var image in images)
            {
                hotel.AddImage(image);
            }
            existingHotel.UpdateDate = hotel.UpdateDate;
            existingHotel.CreateDate = hotel.CreateDate;
            existingHotel.UpdateBy = hotel.UpdateBy;
            existingHotel.CreateBy = hotel.CreateBy;
            existingHotel.Name = hotel.Name;
            existingHotel.IsActive = hotel.IsActive;
            existingHotel.Address = hotel.Address;
            existingHotel.PhoneNumber = hotel.PhoneNumber;
            existingHotel.LocationId = hotel.LocationId;
            existingHotel.Image = hotel.Image;
            //existingHotel.ImageDetail = hotel.ImageDetail;
            existingHotel.Price_range = hotel.Price_range;
            existingHotel.Rating = hotel.Rating;
            existingHotel.Description = hotel.Description;
            existingHotel.Links = hotel.Links;
            if (await IsHotelAddressDuplicate(hotel.Address))
            {
                throw new BadRequestExceptions("Hotel Address is exist.");
            }

            await unitofWork.Repository<Hotel>().Update(existingHotel);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete hotel
        public async Task Delete(int id)
        {
            var existingHotel = await unitofWork.Repository<Hotel>().GetByIdAsync(id);
            var itineraryHaveHotelId = await unitofWork.Repository<Itinerary>().GetAllWithAsync(new HotelDeleteItinerarySpec(id));
            if (existingHotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
            foreach (var iteam in itineraryHaveHotelId)
            {
                await unitofWork.Repository<Itinerary>().Delete(iteam);
            }
            await unitofWork.Repository<Hotel>().Delete(existingHotel);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        public async Task<object> GetByHotelId(int id)
        {
            var hotel = await unitofWork.Repository<Hotel>().GetByIdAsync(id);
            if (hotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new
            {
                hotel.Id,
                hotel.Name,
                hotel.Price_range,
                hotel.Rating,
                hotel.LocationId,
                hotel.Description,
                hotel.Image,
                hotel.Address,
                hotel.PhoneNumber,
                hotel.Links,
                urlImage = Image.GetUrlImage(hotel.Name, "hotel", httpRequest)
            };
            return result;
        }

        //duplicate name
        private async Task<bool> IsHotelAddressDuplicate(string hotelName)
        {
            // Sử dụng GetEntityWithSpecAsync để kiểm tra trùng lặp
            var duplicateHotel = await unitofWork
                .Repository<Hotel>()
                .GetEntityWithSpecAsync(new HotelByAddressSpecification(hotelName));

            return duplicateHotel != null;
        }
        
        public async Task<Pagination<HotelDto>> SelectAllHotelPagination(SpecParams specParams)
        {

            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var spec = new SearchHotelSpec(specParams);
            var result = new List<HotelDto>();
            int count = await unitofWork.Repository<Hotel>().GetCountWithSpecAsync(spec);
            var restaurantPage = new List<Hotel>();
            if (string.IsNullOrEmpty(specParams.Search) && string.IsNullOrEmpty(specParams.Location) && specParams.Rating == null)
            {
                restaurantPage = await context.Hotels.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToListAsync();
            }
            else
            {
                var restaurants = await unitofWork.Repository<Hotel>().GetAllWithAsync(spec);

                restaurantPage = restaurants.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            }
            foreach (var restaurant in restaurantPage)
            {
                var restaurantInfo = new HotelDto
                {
                    Id = restaurant.Id,
                    Name = restaurant.Name,
                    Price_range = restaurant.Price_range,
                    Rating = restaurant.Rating,
                    PhoneNumber = restaurant.PhoneNumber,
                    Location = restaurant.location1.State,
                    UrlImage = Image.GetUrlImage(restaurant.Name, "hotel", httpRequest)
                };
                result.Add(restaurantInfo);
            }
            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<HotelDto>(specParams.PageIndex, specParams.PageSize, result, count, totalPageIndex);

            return pagination;
        }
    }

}
