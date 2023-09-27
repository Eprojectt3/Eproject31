using AutoMapper;
using backend.Dao.Specification;
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
        public RestaurantBusinessLogic(IUnitofWork _unitofWork, IMapper mapper)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
        }

        //list category
        public async Task<IReadOnlyList<Restaurant>> SelectAllRestaurant()
        {
            var data = await unitofWork.Repository<Restaurant>().GetAllAsync();
            return data;
        }

        //create category
        public async Task Create(Restaurant restaurant)
        {
            if (restaurant is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }

            if (await IsRestaurantNameDuplicate(restaurant.Address))
            {
                throw new BadRequestExceptions("Restaurant Address is exist.");
            }

            await unitofWork.Repository<Restaurant>().AddAsync(restaurant);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update restaurant
        public async Task Update(Restaurant restaurant)
        {
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
            if (existingRestaurant == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Restaurant>().Delete(existingRestaurant);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //get restaurant by id
        public async Task GetByRestaurantId(int id)
        {
            var existingHotel = await unitofWork.Repository<Restaurant>().GetByIdAsync(id);
            if (existingHotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
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
            var resorts = await unitofWork.Repository<Restaurant>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Restaurant>, IReadOnlyList<RestaurantDto>>(resorts);
            var restaurantPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            var countSpec = new SearchRestaurantSpec(specParams);
            var count = await unitofWork.Repository<Restaurant>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<RestaurantDto>(specParams.PageIndex, specParams.PageSize, restaurantPage, count, totalPageIndex);

            return pagination;
        }
    }
}
