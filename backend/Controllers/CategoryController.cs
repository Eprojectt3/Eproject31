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
        public CategoryBussinessLogic categoryBussinessLogic;
        public CategoryController(CategoryBussinessLogic categoryBussiness)
        {
            categoryBussinessLogic = categoryBussiness;
        }

        // execute list all category
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

        //execute add new category
        [HttpPost]

        public async Task<IActionResult> Add(Category category)
        {
            
            await categoryBussinessLogic.Create(category);

            return Ok(category);
        }

        //execute update category
        [HttpPost]
        public async Task<IActionResult> Update( Category category)
        {

            await categoryBussinessLogic.Update(category);
            return Ok(category);
        }

        //execute delete category
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await categoryBussinessLogic.Delete(id);
            return Ok();
        }

        
    }
}