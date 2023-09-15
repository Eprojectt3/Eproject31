using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        public LocationBusinessLogic locationBussinessLogic;
        public LocationController(LocationBusinessLogic locationBussiness)
        {
            locationBussinessLogic = locationBussiness;
        }

        // execute list all location
        [HttpGet]
        public async Task<ActionResult> ListLocation1()
        {
            var output = await locationBussinessLogic.SelectAllLocation();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new location
        [HttpPost]

        public async Task<IActionResult> Add(Location1 location)
        {

            await locationBussinessLogic.Create(location);

            return Ok(location);
        }

        //execute update location
        [HttpPost]
        public async Task<IActionResult> Update(Location1 location)
        {

            await locationBussinessLogic.Update(location);
            return Ok(location);
        }

        //execute delete location
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await locationBussinessLogic.Delete(id);
            return Ok();
        }
    }
}
