﻿using backend.Dao.Specification.RestaurantSpec;
using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
  public class RestaurantBusinessLogic
  {
    public IUnitofWork unitofWork;

    public RestaurantBusinessLogic(IUnitofWork _unitofWork)
    {
      unitofWork = _unitofWork;
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
  }
}
