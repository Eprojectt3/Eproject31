using backend.BussinessLogic;
using backend.Dao.Specification;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public OrderBusinessLogic orderBusinessLogic;
        public OrderController(OrderBusinessLogic Bussiness)
        {
            orderBusinessLogic = Bussiness;
        }

        // execute list all order
        [HttpGet]
        public async Task<ActionResult> ListOrder()
        {
            var output = await orderBusinessLogic.SelectAllOrder();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }


        [HttpPost]
        public async Task<ActionResult> ListOrderPagination(SpecParams pagination)
        {
            var output = await orderBusinessLogic.SelectAllOrderPagination(pagination);
            if(output.Data.Count == 0) { 
            
                return NotFound();
            }
            return Ok(output);
        }
        //execute add new order
        [HttpPost]

        public async Task<IActionResult> Add(Order order)
        {

           var check_order =  await orderBusinessLogic.Create(order);

            return Ok(check_order);
        }

        //execute update order
        [HttpPost]
        public async Task<IActionResult> Update(Order order)
        {

            await orderBusinessLogic.Update(order);
            return Ok(order);
        }

        //execute delete order
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await orderBusinessLogic.Delete(id);
            return Ok();
        }
        [HttpGet]
        public async Task<ActionResult> GetEntity()
        {
            var output = await orderBusinessLogic.GetEntityByCondition(4);
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
    }
}
