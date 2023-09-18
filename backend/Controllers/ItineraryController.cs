using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        public ItineraryBusinessLogic itineraryBusinessLogic;
        public ItineraryController(ItineraryBusinessLogic Bussiness)
        {
            itineraryBusinessLogic = Bussiness;
        }

        // execute list all itinerary
        [HttpGet]
        public async Task<ActionResult> ListItinerary()
        {
            var output = await itineraryBusinessLogic.SelectAllItinerary();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new itinerary
        [HttpPost]
        public async Task<IActionResult> Add(Itinerary itinerary)
        {

            await itineraryBusinessLogic.Create(itinerary);

            return Ok(itinerary);
        }

        //execute update itinerary
        [HttpPost]
        public async Task<IActionResult> Update(Itinerary itinerary)
        {

            await itineraryBusinessLogic.Update(itinerary);
            return Ok(itinerary);
        }

        //execute delete itinerary
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await itineraryBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
