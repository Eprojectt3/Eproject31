using backend.Dao.Specification;
using backend.Dao.Specification.HotelSpec;
using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class HotelBusinessLogic
    {
        public IUnitofWork unitofWork;

        public HotelBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list category
        public async Task<IReadOnlyList<Hotel>> SelectAllHotel()
        {
            var data = await unitofWork.Repository<Hotel>().GetAllAsync();
            return data;
        }

        //create category
        public async Task Create(Hotel hotel)
        {
            if (hotel is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }

            if (await IsHotelAddressDuplicate(hotel.Address))
            {
                throw new BadRequestExceptions("Hotel Address is exist.");
            }


            await unitofWork.Repository<Hotel>().AddAsync(hotel);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update hotel
        public async Task Update(Hotel hotel)
        {
            if (hotel is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingHotel = await unitofWork.Repository<Hotel>().GetByIdAsync(hotel.Id);

            if (existingHotel is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingHotel.UpdateDate = hotel.UpdateDate;
            existingHotel.CreateDate = hotel.CreateDate;
            existingHotel.UpdateBy = hotel.UpdateBy;
            existingHotel.CreateBy = hotel.CreateBy;
            existingHotel.Name = hotel.Name;
            existingHotel.IsActive = hotel.IsActive;
            existingHotel.Address = hotel.Address;
            existingHotel.PhoneNumber = hotel.PhoneNumber;
            existingHotel.Location1 = hotel.Location1;
            existingHotel.LocatinId = hotel.LocatinId;
            existingHotel.Image = hotel.Image;
            existingHotel.ImageDetail = hotel.ImageDetail;
            existingHotel.Price = hotel.Price;
            existingHotel.Price_range = hotel.Price_range;
            existingHotel.Rating = hotel.Rating;
            existingHotel.Description = hotel.Description;
            existingHotel.link = hotel.link;
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
            if (existingHotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Hotel>().Delete(existingHotel);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
        public async Task GetByHotelId(int id)
        {
            var existingHotel = await unitofWork.Repository<Hotel>().GetByIdAsync(id);
            if (existingHotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
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
    }
}
