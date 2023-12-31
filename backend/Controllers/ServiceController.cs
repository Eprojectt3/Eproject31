﻿using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        public ServiceBusinessLogic serviceBusinessLogic;
        public ServiceController(ServiceBusinessLogic Bussiness)
        {
            serviceBusinessLogic = Bussiness;
        }

        // execute list all service
        [HttpGet]
        public async Task<ActionResult> ListService()
        {
            var output = await serviceBusinessLogic.SelectAllService();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new service
        [HttpPost]

        public async Task<IActionResult> Add(Service service)
        {

            await serviceBusinessLogic.Create(service);

            return Ok(service);
        }

        //execute update service
        [HttpPost]
        public async Task<IActionResult> Update(Service service)
        {

            await serviceBusinessLogic.Update(service);
            return Ok(service);
        }

        //execute delete service
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await serviceBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
