using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class FeedBackBusinessLogic
    {
        public IUnitofWork unitofWork;

        public FeedBackBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list feedback
        public async Task<IReadOnlyList<FeedBack>> SelectAllFeedBack()
        {
            var data = await unitofWork.Repository<FeedBack>().GetAllAsync();
            return data;
        }

        //create feedback
        public async Task Create(FeedBack feedback)
        {
            if (feedback is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<FeedBack>().AddAsync(feedback);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update feedback
        public async Task Update(FeedBack feedback)
        {
            if (feedback is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingFeedBack = await unitofWork.Repository<FeedBack>().GetByIdAsync(feedback.Id);

            if (existingFeedBack is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingFeedBack.UpdateDate = feedback.UpdateDate;
            existingFeedBack.CreateDate = feedback.CreateDate;
            existingFeedBack.UpdateBy = feedback.UpdateBy;
            existingFeedBack.CreateBy = feedback.CreateBy;
            existingFeedBack.Title = feedback.Title;
            existingFeedBack.Name = feedback.Name;
            existingFeedBack.Email = feedback.Email;
            existingFeedBack.Phone = feedback.Phone;
            await unitofWork.Repository<FeedBack>().Update(existingFeedBack);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete feedback
        public async Task Delete(int id)
        {

            var existingFeedBack = await unitofWork.Repository<FeedBack>().GetByIdAsync(id);
            if (existingFeedBack == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<FeedBack>().Delete(existingFeedBack);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
    }
}
