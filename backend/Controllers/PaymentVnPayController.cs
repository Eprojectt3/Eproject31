using AutoMapper;
using backend.BussinessLogic;
using backend.Dtos.OrderDetailDtos;
using backend.Dtos.PaymentDtos;
using backend.Entity;
using backend.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentVnPayController : ControllerBase
    {
        private readonly PaymentBussinessLogic paymentBussinessLogic;
        private readonly IMapper mapper;
        public PaymentVnPayController(PaymentBussinessLogic _paymentBussinessLogic, IMapper _mapper)
        {
            paymentBussinessLogic = _paymentBussinessLogic;
            mapper = _mapper;
        }
        [HttpPost]
        public async Task<ActionResult> GetPayment(OrderDetailDtos orderDetail)
        {
            var url = paymentBussinessLogic.GetUrlPayment(orderDetail);
            return Ok(new
            {
                message = url.ToString(),
            });
        }
        
        [HttpPost]
        public async Task<ActionResult> CreateDataAsync(PaymentVnPayDtos paymentVnPay)
        {
            var result = await paymentBussinessLogic.CreateDataAsync(paymentVnPay);
            return Ok(new
            {
                message = result
            });
        }


    }
}
