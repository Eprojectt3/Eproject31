﻿using AutoMapper;
using backend.BussinessLogic;
using backend.Dao;
using backend.Dtos.TourDtos;
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
        public Top_10_Tour_Dao top_10_Tour_Dao;
        public TourController(TourBusinessLogic Bussiness, Top_10_Tour_Dao top_10_Tour_Dao)
        {
            tourBusinessLogic = Bussiness;
            this.top_10_Tour_Dao = top_10_Tour_Dao;
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

        public async Task<IActionResult> Add([FromForm] TourDto tourdto)
        {
            await tourBusinessLogic.Create(tourdto);

            return Ok(tourdto);
        }

        //execute update tour
        [HttpPut]
        public async Task<IActionResult> Update([FromForm] TourDto tourdto)
        {

            await tourBusinessLogic.Update(tourdto);
            return Ok(tourdto);
        }

        //execute delete tour
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await tourBusinessLogic.Delete(id);
            return Ok();
        }
        //get tour by id
        [HttpGet]
        public async Task<IActionResult> GetByTourId(int id)
        {
           var result =  await tourBusinessLogic.GetByTourId(id);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> Gget_Top_10_Tour()
        {
            var result = await top_10_Tour_Dao.Top_10_Tour();
            return Ok(result);
        }
    }
}
