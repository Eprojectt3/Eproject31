﻿using backend.BussinessLogic;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        public OrderDetailBusinessLogic orderDetailBusinessLogic;
        public OrderDetailController(OrderDetailBusinessLogic Bussiness)
        {
            orderDetailBusinessLogic = Bussiness;
        }

        // execute list all orderDetail
        [HttpGet]
        public async Task<ActionResult> ListOrderDetail()
        {
            var output = await orderDetailBusinessLogic.SelectAllOrderDetail();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

        //execute add new orderDetail
        [HttpPost]

        public async Task<IActionResult> Add(OrderDetail orderDetail)
        {

            await orderDetailBusinessLogic.Create(orderDetail);

            return Ok(orderDetail);
        }

        //execute update orderDetail
        [HttpPost]
        public async Task<IActionResult> Update(OrderDetail orderDetail)
        {

            await orderDetailBusinessLogic.Update(orderDetail);
            return Ok(orderDetail);
        }

        //execute delete orderDetail
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await orderDetailBusinessLogic.Delete(id);
            return Ok();
        }
    }
}
