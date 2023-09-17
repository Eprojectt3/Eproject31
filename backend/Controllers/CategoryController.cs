using backend.BussinessLogic;
using backend.Dao.Repository;
using backend.Entity;
using backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        public CategoryBussinessLogic categoryBussinessLogic;
        private readonly IResponseCacheService responseCacheService;
        public CategoryController(CategoryBussinessLogic categoryBussiness, IResponseCacheService responseCache)

        {
            categoryBussinessLogic = categoryBussiness;
            responseCacheService = responseCache;
        }

        // execute list all category
        [HttpGet]
        [Cache(1400)]
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

            var api = "/api/Category/ListCategory*";
            responseCacheService.RemoveCache(api);
            return Ok(category);
        }

        //execute update category
        [HttpPost]
        public async Task<IActionResult> Update(Category category)
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
