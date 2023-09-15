using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class ItineraryBusinessLogic
    {
        public IUnitofWork unitofWork;

        public ItineraryBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list itinerary
        public async Task<IReadOnlyList<Itinerary>> SelectAllItinerary()
        {
            var data = await unitofWork.Repository<Itinerary>().GetAllAsync();
            return data;
        }

        //create itinerary
        public async Task Create(Itinerary itinerary)
        {
            if (itinerary is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<Itinerary>().AddAsync(itinerary);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update itinerary
        public async Task Update(Itinerary itinerary)
        {
            if (itinerary is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingItinerary = await unitofWork.Repository<Itinerary>().GetByIdAsync(itinerary.Id);

            if (existingItinerary is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingItinerary.UpdateDate = itinerary.UpdateDate;
            existingItinerary.CreateDate = itinerary.CreateDate;
            existingItinerary.UpdateBy = itinerary.UpdateBy;
            existingItinerary.CreateBy = itinerary.CreateBy;
            existingItinerary.IsActive = itinerary.IsActive;
            existingItinerary.TourID = itinerary.TourID;
            existingItinerary.Sequence = itinerary.Sequence;
            existingItinerary.Description = itinerary.Description;
            existingItinerary.StartTime = itinerary.StartTime;
            existingItinerary.EndTime = itinerary.EndTime;
            existingItinerary.LocationID = itinerary.LocationID;
            await unitofWork.Repository<Itinerary>().Update(existingItinerary);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete itinerary
        public async Task Delete(int id)
        {

            var existingItinerary = await unitofWork.Repository<Itinerary>().GetByIdAsync(id);
            if (existingItinerary == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Itinerary>().Delete(existingItinerary);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
    }
}
