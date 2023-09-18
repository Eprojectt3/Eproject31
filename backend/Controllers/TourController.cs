using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TourController : ControllerBase
    {
        public TourBusinessLogic tourBusinessLogic;
        public TourController(TourBusinessLogic Bussiness)
        {
            tourBusinessLogic = Bussiness;
        }

        // execute list all tour
        [HttpGet]
        public async Task<ActionResult> ListTour()
        {
            var output = await tourBusinessLogic.SelectAllTour();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new tour
        [HttpPost]

        public async Task<IActionResult> Add(Tour tour)
        {

            await tourBusinessLogic.Create(tour);

            return Ok(tour);
        }

        //execute update tour
        [HttpPost]
        public async Task<IActionResult> Update(Tour tour)
        {

            await tourBusinessLogic.Update(tour);
            return Ok(tour);
        }

        //execute delete tour
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await tourBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
