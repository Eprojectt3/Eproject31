using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class TourDetailBusinessLogic
    {
        public IUnitofWork unitofWork;

        public TourDetailBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list tourDetail
        public async Task<IReadOnlyList<TourDetail>> SelectAllTourDetail()
        {
            var data = await unitofWork.Repository<TourDetail>().GetAllAsync();
            return data;
        }

        //create tourDetail
        public async Task Create(TourDetail tourDetail)
        {
            if (tourDetail is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<TourDetail>().AddAsync(tourDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update tourDetail
        public async Task Update(TourDetail tourDetail)
        {
            if (tourDetail is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingTourDetail = await unitofWork.Repository<TourDetail>().GetByIdAsync(tourDetail.Id);

            if (existingTourDetail is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingTourDetail.UpdateDate = tourDetail.UpdateDate;
            existingTourDetail.CreateDate = tourDetail.CreateDate;
            existingTourDetail.UpdateBy = tourDetail.UpdateBy;
            existingTourDetail.CreateBy = tourDetail.CreateBy;
            existingTourDetail.IsActive = tourDetail.IsActive;
            existingTourDetail.TourId = tourDetail.TourId;
            existingTourDetail.Start_Date = tourDetail.Start_Date;
            existingTourDetail.End_Date = tourDetail.End_Date;
            existingTourDetail.Range_time = tourDetail.Range_time;
            existingTourDetail.Quantity = tourDetail.Quantity;
            existingTourDetail.StaffId = tourDetail.StaffId;
            existingTourDetail.DiscountId = tourDetail.DiscountId;
            existingTourDetail.Description = tourDetail.Description;
            await unitofWork.Repository<TourDetail>().Update(existingTourDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete tourDetail
        public async Task Delete(int id)
        {

            var existingTourDetail = await unitofWork.Repository<TourDetail>().GetByIdAsync(id);
            if (existingTourDetail == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<TourDetail>().Delete(existingTourDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
    }
}
