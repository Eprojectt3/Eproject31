using backend.Entity;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class CategoryBussinessLogic
    {
        public IUnitofWork unitofWork { get; set; }
        public CategoryBussinessLogic(IUnitofWork _unitofWork) {
            unitofWork = _unitofWork;
        }

    

        public async Task<IReadOnlyList<Category>> SelectAllCategory()
        {
            var data = await unitofWork.Repository<Category>().GetAllAsync();
            return data;
        }
        public async Task Create(Category category)
        {
            await unitofWork.Repository<Category>().AddAsync(category);
            await unitofWork.Complete();
        }
        public async Task Update(Category category)
        {
            await unitofWork.Repository<Category>().Update(category);
            await unitofWork.Complete();
        }
        public async Task Delete(Category category)
        {
            await unitofWork.Repository<Category>().Delete(category);
            await unitofWork.Complete();
        }
    }
}