using AutoMapper;
using backend.BussinessLogic;
using backend.Dtos.PaymentDtos;
using backend.Entity;
using backend.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentBussinessLogic paymentBussinessLogic;
        private readonly IMapper mapper;
        public PaymentController(PaymentBussinessLogic _paymentBussinessLogic, IMapper _mapper)
        {
            paymentBussinessLogic = _paymentBussinessLogic;
            mapper = _mapper;
        }
        [HttpGet]
        public async Task<ActionResult> GetPayment()
        {
            var url = paymentBussinessLogic.GetUrlPayment();
            return Ok(url);
        }
        [HttpPost]
        public async Task<IActionResult> Result([FromQuery] PaymentDtos paymentDtos)
        {
            if (paymentDtos.Vnp_Response == "00" && paymentDtos.Vnp_TransactionStatus == "00")
            {
                var payment = mapper.Map<PaymentDtos, Payment>(paymentDtos);
                await paymentBussinessLogic.CreatePayment(payment);
                return Ok("Successfully");
            }
            else
            {
                throw new BadRequestExceptions("something went wrong");
            }
        }


    }
}
