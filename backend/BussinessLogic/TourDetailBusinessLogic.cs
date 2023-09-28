using backend.Dtos.TourDetailDtos;
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

            var existingTourDetail = await GetTourDetailAsync(tourDetail.Id);

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
            existingTourDetail.Quantity = tourDetail.Quantity;
            existingTourDetail.Staff_Id = tourDetail.Staff_Id;
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
        public async Task<TourDetail?> GetTourDetailAsync(int id)
        {
            var check = await unitofWork.Repository<TourDetail>().GetByIdAsync(id);
            if(check == null)
            {
                return null;
            }
            return check;
        }
        public async Task Update_User(TourDetail_By_Update_UserDto tourDetail)
        {
            if (tourDetail == null)
            {
                throw new ArgumentNullException(nameof(tourDetail), "Tour detail cannot be null.");
            }

            var existingTourDetail = await GetTourDetailAsync(tourDetail.Id);

            if (existingTourDetail == null)
            {
                throw new NotFoundExceptions($"Tour detail with Id {tourDetail.Id} not found.");
            }

            try
            {
                existingTourDetail.Start_Date = tourDetail.Start_Date;
                existingTourDetail.End_Date = tourDetail.Start_Date.AddDays(tourDetail.Range_time);

                await unitofWork.Repository<TourDetail>().Update(existingTourDetail);
                var check = await unitofWork.Complete();

                if (check < 1)
                {
                    throw new BadRequestExceptions("Operation failed.");
                }
            }
            catch (Exception ex)
            {
              
                throw new Exception("Some thing went wrong"); 
            }
        }

    }
}
