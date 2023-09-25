using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        public StaffBusinessLogic staffBusinessLogic;
        public StaffController(StaffBusinessLogic Bussiness)
        {
            staffBusinessLogic = Bussiness;
        }

        // execute list all staff
        [HttpGet]
        public async Task<ActionResult> ListStaff()
        {
            var output = await staffBusinessLogic.SelectAllStaff();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new staff
        [HttpPost]

        public async Task<IActionResult> Add(Staff staff)
        {

            await staffBusinessLogic.Create(staff);

            return Ok(staff);
        }

        //execute update staff
        [HttpPost]
        public async Task<IActionResult> Update(Staff staff)
        {

            await staffBusinessLogic.Update(staff);
            return Ok(staff);
        }

        //execute delete staff
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await staffBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
