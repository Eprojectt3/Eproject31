using backend.BussinessLogic;
using backend.Dao.Specification;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ResortController : ControllerBase
    {
        public ResortBusinessLogic resortBusinessLogic;
        public ResortController(ResortBusinessLogic resortBussiness)
        {
            resortBusinessLogic = resortBussiness;
        }

        // execute list all resort
        [HttpGet]
        public async Task<ActionResult> ListResorts()
        {
            var output = await resortBusinessLogic.SelectAllResorts();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new resort
        [HttpPost]

        public async Task<IActionResult> Add(Resorts resort)
        {

            await resortBusinessLogic.Create(resort);

            return Ok(resort);
        }

        //execute update resort
        [HttpPost]
        public async Task<IActionResult> Update(Resorts resort)
        {

            await resortBusinessLogic.Update(resort);
            return Ok(resort);
        }

        //execute delete resort
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await resortBusinessLogic.Delete(id);
            return Ok();
        }
        //get hotel by id
        [HttpPost]
        public async Task<IActionResult> GetByResortId(int id)
        {
            await resortBusinessLogic.GetByResortId(id);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> ListResortsPagination(SpecParams pagination)
        {
            var output = await resortBusinessLogic.SelectAllResortsPagination(pagination);

            // Kiểm tra xem trang có dữ liệu hay không
            if (output.Data.Count == 0)
            {
                return NotFound();
            }

            // Trả về dữ liệu phân trang và thông tin về trang
            return Ok(output);
        }
    }
}
