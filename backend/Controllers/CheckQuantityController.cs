using backend.BussinessLogic;
using backend.Dao;
using backend.Dtos;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Dao.UnitofWork;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckQuantityController : ControllerBase
    {
        public Search_TourDetail_Dao search_tour;
        public IUnitofWork unitofWork;
        public CheckQuantityController(Search_TourDetail_Dao search_Tour, IUnitofWork unitofWork)
        {
            this.search_tour = search_Tour;
            this.unitofWork = unitofWork;
        }
        [HttpPost]
        public async Task<IActionResult> CheckQuantity(CheckQuantityDtos checkQuantity)
        {
            var tour_Detail = await search_tour.QueryDao(checkQuantity.Start_Date, checkQuantity.TourID);
            if (tour_Detail != null)
            {
                if(checkQuantity.number_people > tour_Detail.Quantity)
                {
                    return Ok(new
                    {
                        message = "over the number of people"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        message = "Success"
                    });
                }
            }
            else
            {
                var Tour = await unitofWork.Repository<Tour>().GetByIdAsync(checkQuantity.TourID);
                if (checkQuantity.number_people > Tour.quantity_limit)
                {
                    return Ok(new
                    {
                        message = "over the number of people"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        message = "Success"
                    });
                }
            }
        }
    }
}
