using backend.BussinessLogic;
using backend.Dao.Specification;
using backend.Dtos.TourDetailDtos;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TourDetailController : ControllerBase
    {
        public TourDetailBusinessLogic tourDetailBusinessLogic;
        public Search_Tour_Dao tourDetailSearch;
        public TourDetailController(TourDetailBusinessLogic Bussiness, Search_Tour_Dao search_Tour_Dao)
        {
            tourDetailBusinessLogic = Bussiness;
            tourDetailSearch = search_Tour_Dao;
        }

        // execute list all tourDetail
        [HttpGet]
        public async Task<ActionResult> ListTourDetail()
        {
            var output = await tourDetailBusinessLogic.SelectAllTourDetail();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new tourDetail
        [HttpPost]

        public async Task<IActionResult> Add(TourDetail tourDetail)
        {

           var test =  await tourDetailBusinessLogic.Create(tourDetail);

            return Ok(test);
        }

        //execute update tourDetail
        [HttpPost]
        public async Task<IActionResult> Update(TourDetail tourDetail)
        {

            await tourDetailBusinessLogic.Update(tourDetail);
            return Ok(tourDetail);
        }

        //execute delete tourDetail
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await tourDetailBusinessLogic.Delete(id);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Update_User(TourDetail_By_Update_UserDto tourDetail_By_Update_UserDto)
        {
            await tourDetailBusinessLogic.Update_User(tourDetail_By_Update_UserDto);
            return Ok("Success");
        }
    }
}
