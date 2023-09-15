using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class ServiceBusinessLogic
    {
        public IUnitofWork unitofWork;

        public ServiceBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list service
        public async Task<IReadOnlyList<Service>> SelectAllService()
        {
            var data = await unitofWork.Repository<Service>().GetAllAsync();
            return data;
        }

        //create service
        public async Task Create(Service service)
        {
            if (service is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<Service>().AddAsync(service);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update service
        public async Task Update(Service service)
        {
            if (service is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingService = await unitofWork.Repository<Service>().GetByIdAsync(service.ID);

            if (existingService is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingService.UpdateDate = service.UpdateDate;
            existingService.CreateDate = service.CreateDate;
            existingService.UpdateBy = service.UpdateBy;
            existingService.CreateBy = service.CreateBy;
            existingService.TourID = service.TourID;
            existingService.Name = service.Name;
            existingService.Description = service.Description;
            
            await unitofWork.Repository<Service>().Update(existingService);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete service
        public async Task Delete(int id)
        {

            var existingService = await unitofWork.Repository<Service>().GetByIdAsync(id);
            if (existingService == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Service>().Delete(existingService);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
    }
}
