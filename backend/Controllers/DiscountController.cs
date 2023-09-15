using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        public DiscountBusinessLogic discountBussinessLogic;
        public DiscountController(DiscountBusinessLogic discountBussiness)
        {
            discountBussinessLogic = discountBussiness;
        }

        // execute list all discount
        [HttpGet]
        public async Task<ActionResult> ListDiscount()
        {
            var output = await discountBussinessLogic.SelectAllDiscount();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new discount
        [HttpPost]

        public async Task<IActionResult> Add(Discount discount)
        {

            await discountBussinessLogic.Create(discount);

            return Ok(discount);
        }

        //execute update discount
        [HttpPost]
        public async Task<IActionResult> Update(Discount discount)
        {

            await discountBussinessLogic.Update(discount);
            return Ok(discount);
        }

        //execute delete discount
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await discountBussinessLogic.Delete(id);
            return Ok();
        }
    }
}
