using backend.Dao.Specification;
using backend.Dao.Specification.CategorySpec;
using backend.Entity;
using backend.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Web.Http.ModelBinding;
using webapi.Dao.Specification;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class CategoryBussinessLogic
    {
        public IUnitofWork unitofWork;

        public CategoryBussinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list category
        public async Task<IReadOnlyList<Category>> SelectAllCategory()
        {
            var data = await unitofWork.Repository<Category>().GetAllAsync();
            return data;
        }

        //create category
        public async Task Create(Category category)
        {
            if (category is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }

            if (await IsCategoryNameDuplicate(category.Name))
            {
                throw new BadRequestExceptions("Category Name is exist.");
            }

            await unitofWork.Repository<Category>().AddAsync(category);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update category
        public async Task Update(Category category)
        {
            if (category is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingCategory = await unitofWork
                .Repository<Category>()
                .GetByIdAsync(category.Id);

            if (existingCategory is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingCategory.UpdateDate = category.UpdateDate;
            existingCategory.CreateDate = category.CreateDate;
            existingCategory.UpdateBy = category.UpdateBy;
            existingCategory.CreateBy = category.CreateBy;
            existingCategory.Name = category.Name;
            existingCategory.IsActive = category.IsActive;

            await unitofWork.Repository<Category>().Update(existingCategory);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete category
        public async Task Delete(int id)
        {
            var existingCategory = await unitofWork.Repository<Category>().GetByIdAsync(id);
            if (existingCategory == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Category>().Delete(existingCategory);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //duplicate name
        private async Task<bool> IsCategoryNameDuplicate(string categoryName)
        {
            

            // Sử dụng GetEntityWithSpecAsync để kiểm tra trùng lặp
            var duplicateCategory = await unitofWork
                .Repository<Category>()
                .GetEntityWithSpecAsync(new CategoryByNameSpecification(categoryName));

            return duplicateCategory != null;
        }
    }
}
