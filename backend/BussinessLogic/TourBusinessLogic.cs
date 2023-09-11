
using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class TourBusinessLogic
    {
        public IUnitofWork unitofWork;

        public TourBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
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
            existingTour.discount_Id = tour.discount_Id;
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
    }
}
