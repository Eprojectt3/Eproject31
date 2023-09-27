﻿
using AutoMapper;
using backend.Dao.Specification.TourSpec;
using backend.Dao.Specification;
using backend.Dtos.TourDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class TourBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        public TourBusinessLogic(IUnitofWork _unitofWork, IMapper mapper)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
        }

        //list tour
        public async Task<IReadOnlyList<Tour>> SelectAllTour()
        {
            var data = await unitofWork.Repository<Tour>().GetAllAsync();
            return data;
        }

        //create tour
        public async Task Create(Tour tour)
        {
            if (tour is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            // Kiểm tra nếu Discount = 0 thì cập nhật Price_After_Discount = Price
            if (tour.Discount == 0)
            {
                tour.Price_After_Discount = tour.Price;
            }
            else
            {
                // Tính giá sau khi giảm giá dựa trên Discount
                // Giá sau giảm giá = Giá ban đầu - (Giá ban đầu * (Discount / 100))
                tour.Price_After_Discount = tour.Price - (tour.Price * (tour.Discount / 100));
            }
            await unitofWork.Repository<Tour>().AddAsync(tour);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update tour
        public async Task Update(Tour tour)
        {
            if (tour is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingTour = await unitofWork.Repository<Tour>().GetByIdAsync(tour.Id);

            if (existingTour is null)
            {
                throw new NotFoundExceptions("not found");
            }
            // Kiểm tra nếu Discount = 0 thì cập nhật Price_After_Discount = Price
            if (tour.Discount == 0)
            {
                existingTour.Price_After_Discount = existingTour.Price;
            }
            else
            {
                // Tính giá sau khi giảm giá dựa trên Discount
                // Giá sau giảm giá = Giá ban đầu - (Giá ban đầu * (Discount / 100))
                existingTour.Price_After_Discount = existingTour.Price - (existingTour.Price * (tour.Discount / 100));
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

        //get restaurant by id
        public async Task GetByTourId(int id)
        {
            var existingHotel = await unitofWork.Repository<Tour>().GetByIdAsync(id);
            if (existingHotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
        }
        public async Task<Pagination<TourDto>> SelectAllTourPagination(SpecParams specParams)
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
