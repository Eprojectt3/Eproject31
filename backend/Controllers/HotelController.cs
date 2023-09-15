using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        public HotelBusinessLogic hotelBusinessLogic;
        public HotelController(HotelBusinessLogic Bussiness)
        {
            hotelBusinessLogic = Bussiness;
        }

        // execute list all hotel
        [HttpGet]
        public async Task<ActionResult> ListHotel()
        {
            var output = await hotelBusinessLogic.SelectAllHotel();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new hotel
        [HttpPost]

        public async Task<IActionResult> Add(Hotel hotel)
        {

            await hotelBusinessLogic.Create(hotel);

            return Ok(hotel);
        }

        //execute update hotel
        [HttpPost]
        public async Task<IActionResult> Update(Hotel hotel)
        {

            await hotelBusinessLogic.Update(hotel);
            return Ok(hotel);
        }

        //execute delete hotel
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await hotelBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
