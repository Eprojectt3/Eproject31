﻿using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        public FeedBackBusinessLogic feedBackBusinessLogic;
        public FeedBackController(FeedBackBusinessLogic Bussiness)
        {
            feedBackBusinessLogic = Bussiness;
        }

        // execute list all tour
        [HttpGet]
        public async Task<ActionResult> ListFeedBack()
        {
            var output = await feedBackBusinessLogic.SelectAllFeedBack();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new tour
        [HttpPost]

        public async Task<IActionResult> Add(FeedBack tour)
        {

            await feedBackBusinessLogic.Create(tour);

            return Ok(tour);
        }

        //execute update tour
        [HttpPost]
        public async Task<IActionResult> Update(FeedBack tour)
        {

            await feedBackBusinessLogic.Update(tour);
            return Ok(tour);
        }

        //execute delete tour
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await feedBackBusinessLogic.Delete(id);
            return Ok();
        }
        
    }
}
