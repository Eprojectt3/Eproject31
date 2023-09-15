using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public CategoryBussinessLogic categoryBussinessLogic { get; set; }
        public CategoryController(CategoryBussinessLogic categoryBussiness)
        {
            categoryBussinessLogic = categoryBussiness;
        }

        // list all category
        [HttpGet]
        public async Task<ActionResult> ListCategory()
        {
            var output = await categoryBussinessLogic.SelectAllCategory();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //add new category
        [HttpPost]
      
        public async Task<IActionResult> Add(Category category)
        {
            if (category is null)
            {

                return Ok(NotFound());
            }
            if (!ModelState.IsValid)
            {

                return Ok(ModelState);
            }
            bool isDuplicate = await IsCategoryNameDuplicate(category.Name);
            if (isDuplicate)
            {
                ModelState.AddModelError("DuplicateName", "CategoryName has been exist.");
                return BadRequest(ModelState);
            }
            await categoryBussinessLogic.Create(category);

            return Ok(category);
        }

        //update category
        [HttpPost]
        public async Task<IActionResult> Update(int id,Category category)
        {
            if (category is null)
            {

                return Ok(NotFound());
            }
            var existingCategory = await categoryBussinessLogic.SelectAllCategory();
            existingCategory.FirstOrDefault(cat => cat.Id == id);
            if (existingCategory == null)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {

                return Ok(ModelState);
            }
            bool isDuplicate = await IsCategoryNameDuplicate(category.Name);
            if (isDuplicate)
            {
                ModelState.AddModelError("DuplicateName", "CategoryName has been exist.");
                return BadRequest(ModelState);
            }
            await categoryBussinessLogic.Update(category);
            return Ok(category);
        }

        //delete category
        [HttpDelete]
        public async Task<IActionResult> Delete(int id )
        {
            
            var existingCategory = await categoryBussinessLogic.SelectAllCategory();
            Category category = existingCategory.FirstOrDefault(cat => cat.Id == id);
            if (existingCategory == null)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {

                return Ok(ModelState);
            }
            await categoryBussinessLogic.Delete(category);
            return Ok(category);
        }

        //duplicate name 
        private async Task<bool> IsCategoryNameDuplicate(string categoryName)
        {
            // Truy vấn danh sách tất cả danh mục hiện có trong ứng dụng
            var allCategories = await categoryBussinessLogic.SelectAllCategory();

            // Kiểm tra xem tên danh mục đã tồn tại trong danh sách hay chưa
            return allCategories.Any(c => c.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase));
        }
    }
}