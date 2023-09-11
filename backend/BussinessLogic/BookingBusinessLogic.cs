using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class BookingBusinessLogic
    {
        public IUnitofWork unitofWork;

        public BookingBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list booking
        public async Task<IReadOnlyList<Booking>> SelectAllBooking()
        {
            var data = await unitofWork.Repository<Booking>().GetAllAsync();
            return data;
        }

        //create booking
        public async Task Create(Booking booking)
        {
            if (booking is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<Booking>().AddAsync(booking);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update booking
        public async Task Update(Booking booking)
        {
            if (booking is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingBooking = await unitofWork.Repository<Booking>().GetByIdAsync(booking.Id);

            if (existingBooking is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingBooking.UpdateDate = booking.UpdateDate;
            existingBooking.CreateDate = booking.CreateDate;
            existingBooking.UpdateBy = booking.UpdateBy;
            existingBooking.CreateBy = booking.CreateBy;
            existingBooking.IsActive = booking.IsActive;
            existingBooking.TourId = booking.TourId;
            existingBooking.Start_Date = booking.Start_Date;
            existingBooking.End_Date = booking.End_Date;
            existingBooking.Range_time = booking.Range_time;
            existingBooking.Quantity = booking.Quantity;
            existingBooking.StaffId = booking.StaffId;
            existingBooking.DiscountId = booking.DiscountId;
            existingBooking.Description = booking.Description;
            await unitofWork.Repository<Booking>().Update(existingBooking);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete booking
        public async Task Delete(int id)
        {

            var existingBooking = await unitofWork.Repository<Booking>().GetByIdAsync(id);
            if (existingBooking == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Booking>().Delete(existingBooking);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
    }
}
