using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class TransportationBusinessLogic
    {
        public IUnitofWork unitofWork;
        public TransportationBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list category
        public async Task<IReadOnlyList<Transportation>> SelectAllTransportation()
        {
            var data = await unitofWork.Repository<Transportation>().GetAllAsync();
            return data;
        }

        //create category
        public async Task Create(Transportation transportation)
        {
            if (transportation is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }




            await unitofWork.Repository<Transportation>().AddAsync(transportation);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update transportation
        public async Task Update(Transportation transportation)
        {
            if (transportation is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingTransportation = await unitofWork.Repository<Transportation>().GetByIdAsync(transportation.Id);

            if (existingTransportation is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingTransportation.UpdateDate = transportation.UpdateDate;
            existingTransportation.CreateDate = transportation.CreateDate;
            existingTransportation.UpdateBy = transportation.UpdateBy;
            existingTransportation.CreateBy = transportation.CreateBy;
            existingTransportation.IsActive = transportation.IsActive;
            existingTransportation.Name = transportation.Name;
            existingTransportation.Price = transportation.Price;
            existingTransportation.Description = transportation.Description;


            await unitofWork.Repository<Transportation>().Update(existingTransportation);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete transportation
        public async Task Delete(int id)
        {

            var existingTransportation = await unitofWork.Repository<Transportation>().GetByIdAsync(id);
            if (existingTransportation == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Transportation>().Delete(existingTransportation);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
    }
}
