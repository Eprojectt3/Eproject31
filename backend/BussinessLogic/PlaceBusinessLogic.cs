using AutoMapper;
using backend.Dao;
using backend.Dao.Specification;
using backend.Dao.Specification.HotelSpec;
using backend.Dao.Specification.LocationSpec;
using backend.Dtos;
using backend.Dtos.HotelDtos;
using backend.Dtos.LocationDtos;
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
    public class PlaceBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        private ImageService Image;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private DataContext context;
        private Get_Place_Type_Dao Get_Place_Type;
        public PlaceBusinessLogic(
            IUnitofWork _unitofWork,
            IMapper mapper,
            ImageService Image,
            IHttpContextAccessor _httpContextAccessor,
            DataContext dataContext,
            Get_Place_Type_Dao get_Place_Type
        )
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
            this.Image = Image;
            this._httpContextAccessor = _httpContextAccessor;
            context = dataContext;
            Get_Place_Type = get_Place_Type;
        }

        //list hotel
        public async Task<IEnumerable<object>> SelectAllHotel()
        {
            var data = await unitofWork.Repository<Place>().GetAllAsync();
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
                };

                result.Add(hotelInfo);
            }
            return result;
        }

        //create 
        public async Task Create(PlaceImageDto placedto)
        {
            var place = mapper.Map<PlaceImageDto, Place>(placedto);
            if (placedto is null)
            {
                throw new NotFoundExceptions("Hotel not found");
            }

            var Name_replace = placedto.Name.Replace(" ", "-");
            var date = place.CreateDate;
            var image_folder =
                Name_replace + "-" + date.ToString("yyyy-MM-dd-HH-mm-ss");
            var name = Get_Place_Type.Get_Name_Type(placedto.Place_Type_ID);          
            var images = await Image.Upload_Image(image_folder, name.ToString(), placedto.fileCollection);        
            foreach (var image in images)
            {
                place.AddImage(image);
            }
            place.CreateDate = date;
            await unitofWork.Repository<Place>().AddAsync(place);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update 
        public async Task Update(Place_Update_Dto placedto)
        {
            var place = mapper.Map<PlaceImageDto, Place>(placedto);
            if (place is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingHotel = await unitofWork.Repository<Place>().GetByIdAsync(place.Id);

            if (existingHotel is null)
            {
                throw new NotFoundExceptions("not found");
            }
            var Name_replace = placedto.Name.Replace(" ", "-");
            var image_folder =
                Name_replace + "-" + existingHotel.CreateDate.ToString("yyyy-MM-dd-HH-mm-ss");
            var name = Get_Place_Type.Get_Name_Type(placedto.Place_Type_ID);

            var images = await Image.Update_Image(
                image_folder,
                existingHotel.Name.Replace(" ", "-")
                    + "-"
                    + existingHotel.CreateDate.ToString("yyyy-MM-dd-HH-mm-ss"),
               name.ToString(),
                placedto.path,
                placedto.fileCollection
            );
            images.Add("JPG.JPG");
            foreach (var image in images)
            {
                place.AddImage(image);
            }
            existingHotel.UpdateDate = place.UpdateDate;
            existingHotel.UpdateBy = place.UpdateBy;
            existingHotel.CreateBy = place.CreateBy;
            existingHotel.Name = place.Name;
            existingHotel.IsActive = place.IsActive;
            existingHotel.Address = place.Address;
            existingHotel.PhoneNumber = place.PhoneNumber;
            existingHotel.LocationId = place.LocationId;
            existingHotel.Image = place.Image;
            //existingHotel.ImageDetail = hotel.ImageDetail;
            existingHotel.Price_range = place.Price_range;
            existingHotel.Rating = place.Rating;
            existingHotel.Description = place.Description;
            existingHotel.Links = place.Links;
  
            await unitofWork.Repository<Place>().Update(existingHotel);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete 
        public async Task<string> Delete(int Id)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var existingHotel = await unitofWork.Repository<Place>().GetByIdAsync(Id);
                    if (existingHotel == null)
                    {
                        throw new NotFoundExceptions("not found");
                    }

                    var itineraryHaveHotelId = await unitofWork
                        .Repository<Itinerary>()
                        .GetAllWithAsync(new HotelDeleteItinerarySpec(Id));
                    if (itineraryHaveHotelId.Any())
                    {
                        await unitofWork.Repository<Itinerary>().DeleteRange(itineraryHaveHotelId);
                    }

                    await unitofWork.Repository<Place>().Delete(existingHotel);

                    var check = await unitofWork.Complete();
                    if (check < 1)
                    {
                        throw new BadRequestExceptions("chua dc thuc thi");
                    }
                    var Name_replace = existingHotel.Name.Replace(" ", "-");
                    var image_folder =
                        Name_replace
                        + "-"
                        + existingHotel.CreateDate.ToString("yyyy-MM-dd-HH-mm-ss");
                    var name = Get_Place_Type.Get_Name_Type(existingHotel.Place_Type_ID);
                    var delete_image = Image.DeleteImage(image_folder, name.ToString());
                    transaction.Commit(); // Commit giao dịch nếu mọi thứ thành công
                    return delete_image;
                }
                catch (Exception ex)
                {
                    transaction.Rollback(); // Rollback giao dịch nếu có ngoại lệ
                    throw ex;
                }
            }
        }

        public async Task<object> GetByHotelId(int id)
        {
            var hotel = await unitofWork.Repository<Place>().GetByIdAsync(id);
            if (hotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
            var Name_replace = hotel.Name.Replace(" ", "-");
            var image_folder =
                Name_replace + "-" + hotel.CreateDate.ToString("yyyy-MM-dd-HH-mm-ss");
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var name = Get_Place_Type.Get_Name_Type(hotel.Place_Type_ID);
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
                Type = name.ToString(),
                urlImage = Image.GetUrlImage(image_folder, name.ToString(), httpRequest)
            };
            return result;
        }

        //duplicate name
 

        public async Task<Pagination<PlaceDto>> SelectAllHotelPagination(SpecParams specParams)
        {
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var spec = new SearchHotelSpec(specParams);
            var result = new List<PlaceDto>();
            int count = await unitofWork.Repository<Place>().GetCountWithSpecAsync(spec);
            var restaurantPage = new List<Place>();
            if (
                string.IsNullOrEmpty(specParams.Search)
                && string.IsNullOrEmpty(specParams.Location)
                && specParams.Rating == null
            )
            {
                restaurantPage = await context.Places.Where(p=> p.Place_Type_ID == specParams.Place_Type_ID)
                    .Skip((specParams.PageIndex - 1) * specParams.PageSize)
                    .Take(specParams.PageSize)
                    .ToListAsync();
            }
            else
            {
                var restaurants = await unitofWork.Repository<Place>().GetAllWithAsync(spec);

                restaurantPage = restaurants
                    .Skip((specParams.PageIndex - 1) * specParams.PageSize)
                    .Take(specParams.PageSize)
                    .ToList();
            }
            //Them ảnh
            foreach (var restaurant in restaurantPage)
            {
                var Name_replace = restaurant.Name.Replace(" ", "-");
                var image_folder =
                    Name_replace + "-" + restaurant.CreateDate.ToString("yyyy-MM-dd-HH-mm-ss");
                var location = context.Locations.FirstOrDefault(l => l.ID == restaurant.LocationId);
                var name = Get_Place_Type.Get_Name_Type(restaurant.Place_Type_ID);
                var restaurantInfo = new PlaceDto
                {
                    Id = restaurant.Id,
                    Name = restaurant.Name,
                    Price_range = restaurant.Price_range,
                    Rating = restaurant.Rating,
                    PhoneNumber = restaurant.PhoneNumber,
                    Location = location.State,
                    UrlImage = Image.GetUrlImage(image_folder, name.ToString(), httpRequest)
                };
                result.Add(restaurantInfo);
            }
            var totalPageIndex =
                count % specParams.PageSize == 0
                    ? count / specParams.PageSize
                    : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<PlaceDto>(
                specParams.PageIndex,
                specParams.PageSize,
                result,
                count,
                totalPageIndex
            );

            return pagination;
        }
    }
}
