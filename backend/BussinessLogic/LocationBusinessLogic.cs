
using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class LocationBusinessLogic
    {
        public IUnitofWork unitofWork;
        public LocationBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list category
        public async Task<IReadOnlyList<Location1>> SelectAllLocation()
        {
            var data = await unitofWork.Repository<Location1>().GetAllAsync();
            return data;
        }

        //create category
        public async Task Create(Location1 location)
        {
            if (location is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }

          


            await unitofWork.Repository<Location1>().AddAsync(location);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update location
        public async Task Update(Location1 location)
        {
            if (location is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingLocation1 = await unitofWork.Repository<Location1>().GetByIdAsync(location.ID);

            if (existingLocation1 is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingLocation1.UpdateDate = location.UpdateDate;
            existingLocation1.CreateDate = location.CreateDate;
            existingLocation1.UpdateBy = location.UpdateBy;
            existingLocation1.CreateBy = location.CreateBy;
            existingLocation1.State = location.State;
            
            

            await unitofWork.Repository<Location1>().Update(existingLocation1);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete location
        public async Task Delete(int id)
        {

            var existingLocation1 = await unitofWork.Repository<Location1>().GetByIdAsync(id);
            if (existingLocation1 == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Location1>().Delete(existingLocation1);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        
    }
}
