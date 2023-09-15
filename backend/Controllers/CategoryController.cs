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
        public CategoryBusinessLogic categoryBusinessLogic;
        private readonly IResponseCacheService responseCacheService;

        public CategoryController(
            CategoryBusinessLogic categoryBussiness,
            IResponseCacheService responseCache
        )
        {
            categoryBusinessLogic = categoryBussiness;
            responseCacheService = responseCache;
        }

        // execute list all category
        [HttpGet]
        [Cache(1400)]
        public async Task<ActionResult> ListCategory(int id = 1, string hehe = "abc")
        {
            var output = await categoryBusinessLogic.SelectAllCategory();
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
            
            await categoryBusinessLogic.Create(category);

            var api = "/api/Category/ListCategory*";
            responseCacheService.RemoveCache(api);
            return Ok(category);
        }

        //execute update category
        [HttpPost]
        public async Task<IActionResult> Update( Category category)
        {

            await categoryBusinessLogic.Update(category);
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
            await categoryBusinessLogic.Delete(id);
            return Ok();
        }

        
    }
}
