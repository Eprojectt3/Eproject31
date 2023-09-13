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
        [HttpGet]
        public async Task<ActionResult> ListCategory()
        {
            var output = await categoryBussinessLogic.SelectAllCategory();
            return Ok(output);
        }
        [HttpPost]
        [Route("[Controller]/[Action]")]
        public async Task<IActionResult> Add(Category category)
        {
            await categoryBussinessLogic.Create(category);

            return Ok(category);
        }
    }
}