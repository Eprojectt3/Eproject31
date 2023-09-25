using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        public BookingBusinessLogic bookingBusinessLogic;
        public BookingController(BookingBusinessLogic Bussiness)
        {
            bookingBusinessLogic = Bussiness;
        }

        // execute list all booking
        [HttpGet]
        public async Task<ActionResult> ListBooking()
        {
            var output = await bookingBusinessLogic.SelectAllBooking();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new booking
        [HttpPost]

        public async Task<IActionResult> Add(Booking booking)
        {

            await bookingBusinessLogic.Create(booking);

            return Ok(booking);
        }

        //execute update booking
        [HttpPost]
        public async Task<IActionResult> Update(Booking booking)
        {

            await bookingBusinessLogic.Update(booking);
            return Ok(booking);
        }

        //execute delete booking
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await bookingBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
