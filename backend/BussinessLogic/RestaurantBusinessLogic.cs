﻿using AutoMapper;
using backend.Dao.Specification;
using backend.Dao.Specification.ResortSpec;
using backend.Dao.Specification.RestaurantSpec;
using backend.Dtos.RestaurantDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class RestaurantBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        private ImageService Image;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RestaurantBusinessLogic(IUnitofWork _unitofWork, IMapper mapper, ImageService Image, IHttpContextAccessor _httpContextAccessor)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
            this.Image = Image;
            this._httpContextAccessor = _httpContextAccessor;
        }

        //list restaurant
        public async Task<IEnumerable<object>> SelectAllRestaurant()
        {
            var data = await unitofWork.Repository<Restaurant>().GetAllAsync();
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new List<object>();

            foreach (var restaurant in data)
            {
                var restaurantInfo = new
                {
                    restaurant.Id,
                    restaurant.Name,
                    restaurant.Price_range,
                    restaurant.Rating,
                    restaurant.LocationId,
                    restaurant.Description,
                    restaurant.Image,
                    restaurant.Address,
                    restaurant.PhoneNumbber,
                    restaurant.Links,
                    UrlImage = Image.GetUrlImage(restaurant.Name, "restaurant", httpRequest) // Gọi phương thức GetUrlImage cho từng bản ghi
                };

                result.Add(restaurantInfo);
            }
            return result;
        }

        //create category
        public async Task Create(RestaurantImageDto restaurantDto)
        {
            var restaurant = mapper.Map<RestaurantImageDto, Restaurant>(restaurantDto);
            if (restaurant is null)
            {
                throw new NotFoundExceptions("Restaurant not found");
            }

            if (await IsRestaurantNameDuplicate(restaurant.Address))
            {
                throw new BadRequestExceptions("Restaurant Address is exist.");
            }
            var images = Image.Upload_Image(restaurantDto.Name, "restaurant", restaurantDto.fileCollection);
            foreach (var image in images)
            {
                restaurant.AddImage(image);
            }
            await unitofWork.Repository<Restaurant>().AddAsync(restaurant);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update restaurant
        public async Task Update(RestaurantImageDto restaurantDto)
        {
            var restaurant = mapper.Map<RestaurantImageDto, Restaurant>(restaurantDto);
            if (restaurant is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingRestaurant = await unitofWork
                .Repository<Restaurant>()
                .GetByIdAsync(restaurant.Id);

            if (existingRestaurant is null)
            {
                throw new NotFoundExceptions("not found");
            }
            var images = Image.Upload_Image(restaurantDto.Name, "restaurant", restaurantDto.fileCollection);
            foreach (var image in images)
            {
                restaurant.AddImage(image);
            }
            existingRestaurant.UpdateDate = restaurant.UpdateDate;
            existingRestaurant.CreateDate = restaurant.CreateDate;
            existingRestaurant.UpdateBy = restaurant.UpdateBy;
            existingRestaurant.CreateBy = restaurant.CreateBy;
            existingRestaurant.Name = restaurant.Name;
            existingRestaurant.IsActive = restaurant.IsActive;
            existingRestaurant.Address = restaurant.Address;
            existingRestaurant.PhoneNumbber = restaurant.PhoneNumbber;
            existingRestaurant.Image = restaurant.Image;
            existingRestaurant.Price_range = restaurant.Price_range;
            existingRestaurant.Rating = restaurant.Rating;
            existingRestaurant.Description = restaurant.Description;
            existingRestaurant.Links = restaurant.Links;
            existingRestaurant.LocationId = restaurant.LocationId;
            if (await IsRestaurantNameDuplicate(restaurant.Address))
            {
                throw new BadRequestExceptions("Restaurant Address is exist.");
            }

            await unitofWork.Repository<Restaurant>().Update(existingRestaurant);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete restaurant
        public async Task Delete(int id)
        {
            var existingRestaurant = await unitofWork.Repository<Restaurant>().GetByIdAsync(id);
            var itineraryHaveRestaurantId = await unitofWork.Repository<Itinerary>().GetAllWithAsync(new RestaurantDeleteItinerarySpec(id));
            if (existingRestaurant == null)
            {
                throw new NotFoundExceptions("not found");
            }
            foreach (var iteam in itineraryHaveRestaurantId)
            {
                await unitofWork.Repository<Itinerary>().Delete(iteam);
            }
            await unitofWork.Repository<Restaurant>().Delete(existingRestaurant);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //get restaurant by id
        public async Task<object> GetByRestaurantId(int id)
        {
            var restaurant = await unitofWork.Repository<Restaurant>().GetByIdAsync(id);
            if (restaurant == null)
            {
                throw new NotFoundExceptions("not found");
            }
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var result = new
            {
                restaurant.Id,
                restaurant.Name,
                restaurant.Price_range,
                restaurant.Rating,
                restaurant.LocationId,
                restaurant.Description,
                restaurant.Image,
                restaurant.Address,
                restaurant.PhoneNumbber,
                restaurant.Links,
                urlImage = Image.GetUrlImage(restaurant.Name, "restaurant", httpRequest)
            };
            return result;
        }

        //duplicate name
        private async Task<bool> IsRestaurantNameDuplicate(string restaurantName)
        {
            // Sử dụng GetEntityWithSpecAsync để kiểm tra trùng lặp
            var duplicateRestaurant = await unitofWork
                .Repository<Restaurant>()
                .GetEntityWithSpecAsync(new RestaurantByAddressSpecification(restaurantName));

            return duplicateRestaurant != null;
        }
        public async Task<Pagination<RestaurantDto>> SelectAllRestaurantPagination(SpecParams specParams)
        {

            var spec = new SearchRestaurantSpec(specParams);
            var restaurants = await unitofWork.Repository<Restaurant>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Restaurant>, IReadOnlyList<RestaurantDto>>(restaurants);
            var restaurantPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            var countSpec = new SearchRestaurantSpec(specParams);
            var count = await unitofWork.Repository<Restaurant>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<RestaurantDto>(specParams.PageIndex, specParams.PageSize, restaurantPage, count, totalPageIndex);

            return pagination;
        }
    }
}
