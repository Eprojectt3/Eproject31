using backend.Entity;
using backend.Exceptions;
using backend.Model;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class PaymentBussinessLogic
    {
        public IUnitofWork unitofWork;
        private IConfiguration _configuration;


        public PaymentBussinessLogic(IUnitofWork _unitofWork, IConfiguration configuration)
        {
            unitofWork = _unitofWork;
            _configuration = configuration;
        }
        public async Task<IReadOnlyList<Payment>> SelectAllCategory()
        {
            var data = await unitofWork.Repository<Payment>().GetAllAsync();
            return data;
        }
        public async Task CreatePayment(Payment payment)
        {
            if(payment == null)
            {
                throw new NotFoundExceptions("Payment not found");
            }

             await unitofWork.Repository<Payment>().AddAsync(payment);
             var check = await unitofWork.Complete();

            if(check > 0) {
                throw new BadRequestExceptions("Create Payment failed");
            }

        }
        public  string GetUrlPayment()
        {

            //Get Config Info
            string vnp_Returnurl = _configuration.GetSection("VNPayInfo").GetSection("vnp_Returnurl").Value; //URL nhan ket qua tra ve 
            string vnp_Url = _configuration.GetSection("VNPayInfo").GetSection("vnp_Url").Value; //URL thanh toan cua VNPAY 
            string vnp_TmnCode = _configuration.GetSection("VNPayInfo").GetSection("vnp_TmnCode").Value; //Ma website
            string vnp_HashSecret = _configuration.GetSection("VNPayInfo").GetSection("vnp_HashSecret").Value; //Chuoi bi mat

            //Get payment input
            Payment order = new Payment();
            //Save order to db
            order.OrderId = Guid.NewGuid().ToString();
            order.Amount = 10000;
            order.OrderDescription = "VIP1";
            order.CreatedDate = DateTime.Now;
            order.BankCode = "NCB";
            order.Status = 0;

            string locale = "vn";
            //Build URL for VNPAY
            VnPayLibrary vnpay = new VnPayLibrary();

            vnpay.AddRequestData("vnp_Version", "2.1.0");
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (order.Amount * 100).ToString());
            //if (cboBankCode.SelectedItem != null && !string.IsNullOrEmpty(cboBankCode.SelectedItem.Value))
            //{
            //    vnpay.AddRequestData("vnp_BankCode", cboBankCode.SelectedItem.Value);
            //}
            //vnpay.AddRequestData("vnp_BankCode", "NCB");
            vnpay.AddRequestData("vnp_CreateDate", order.CreatedDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress());


            if (!string.IsNullOrEmpty(locale))
            {
                vnpay.AddRequestData("vnp_Locale", locale);
            }
            else
            {
                vnpay.AddRequestData("vnp_Locale", "vn");
            }
            vnpay.AddRequestData("vnp_OrderInfo", order.OrderDescription);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other
            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_TxnRef", order.OrderId);

            string paymentUrl = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);
            return paymentUrl;
        }
    }
}
