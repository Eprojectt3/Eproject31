﻿using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TransportationController : ControllerBase
    {
        public TransportationBusinessLogic transportationBusinessLogic;
        public TransportationController(TransportationBusinessLogic transportationBussiness)
        {
            transportationBusinessLogic = transportationBussiness;
        }

        // execute list all transportation
        [HttpGet]
        public async Task<ActionResult> ListTransportation()
        {
            var output = await transportationBusinessLogic.SelectAllTransportation();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new transportation
        [HttpPost]

        public async Task<IActionResult> Add(Transportation transportation)
        {

            await transportationBusinessLogic.Create(transportation);

            return Ok(transportation);
        }

        //execute update transportation
        [HttpPost]
        public async Task<IActionResult> Update(Transportation transportation)
        {

            await transportationBusinessLogic.Update(transportation);
            return Ok(transportation);
        }

        //execute delete transportation
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await transportationBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
