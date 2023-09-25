using backend.Dtos.OrderDetailDtos;
using backend.Dtos.PaymentDtos;
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
        private UserBussinessLogic UserBussinessLogic;
        private TourDetailBusinessLogic TourDetailBusinessLogic;
        private OrderBusinessLogic OrderBusinessLogic;
        private OrderDetailBusinessLogic OrderDetailBusinessLogic;
        public PaymentBussinessLogic(IUnitofWork _unitofWork, IConfiguration configuration, UserBussinessLogic userBussinessLogic, TourDetailBusinessLogic tourDetailBusinessLogic, OrderBusinessLogic orderBusinessLogic, OrderDetailBusinessLogic orderDetailBusinessLogic)
        {
            unitofWork = _unitofWork;
            _configuration = configuration;
            this.UserBussinessLogic = userBussinessLogic;
            this.TourDetailBusinessLogic = tourDetailBusinessLogic;
            OrderBusinessLogic = orderBusinessLogic;
            OrderDetailBusinessLogic = orderDetailBusinessLogic;
        }
        public async Task<IReadOnlyList<OrderInfo>> SelectAllCategory()
        {
            var data = await unitofWork.Repository<OrderInfo>().GetAllAsync();
            return data;
        }
        public async Task CreatePayment(OrderInfo payment)
        {
            if (payment == null)
            {
                throw new NotFoundExceptions("Payment not found");
            }

            await unitofWork.Repository<OrderInfo>().AddAsync(payment);
            var check = await unitofWork.Complete();

            if (check > 0)
            {
                throw new BadRequestExceptions("Create Payment failed");
            }

        }
        public string GetUrlPayment(OrderDetailDtos orderDetail)
        {

            //Get Config Info
            string vnp_Returnurl = _configuration.GetSection("VNPayInfo").GetSection("vnp_Returnurl").Value; //URL nhan ket qua tra ve 
            string vnp_Url = _configuration.GetSection("VNPayInfo").GetSection("vnp_Url").Value; //URL thanh toan cua VNPAY 
            string vnp_TmnCode = _configuration.GetSection("VNPayInfo").GetSection("vnp_TmnCode").Value; //Ma website
            string vnp_HashSecret = _configuration.GetSection("VNPayInfo").GetSection("vnp_HashSecret").Value; //Chuoi bi mat

            //Get payment input
            OrderInfo order = new OrderInfo();
            //Save order to db
            order.OrderId = Guid.NewGuid().ToString();
            order.Amount = orderDetail.Price;
            order.Quantity = int.Parse(orderDetail.quantity);
            order.OrderDescription = orderDetail.Description;
            order.CreatedDate = DateTime.Now;
            order.BankCode = "NCB";
            order.Status = 0;
            order.Tour_name = orderDetail.Name;
            string locale = "vn";
            //Build URL for VNPAY
            VnPayLibrary vnpay = new VnPayLibrary();

            vnpay.AddRequestData("vnp_Version", "2.1.0");
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", ((Double.Parse(order.Amount)* order.Quantity) *100).ToString());
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
        
        public async Task<string> CreateDataAsync(PaymentVnPayDtos paymentVnPay)
        {
            VnPayLibrary vnpay = new VnPayLibrary();
            
                if (paymentVnPay.vnp_ResponseCode == "00" && paymentVnPay.vnp_TransactionStatus == "00")
                {
                    var tour_detail = await TourDetailBusinessLogic.GetTourDetailAsync(paymentVnPay.TourDetailID);
                    if ( tour_detail == null)
                    {
                        throw new NotFoundExceptions("You have successfully paid but encounter problems during processing, please contact management");
                    }
                    var check_duplicate_order = await OrderBusinessLogic.GetEntityByCondition(paymentVnPay.TourDetailID);
                    if (check_duplicate_order == null)
                    {
                        var order = new Entity.Order();
                        order.Tour_Detail_ID = paymentVnPay.TourDetailID;
                        var check_create_order = OrderBusinessLogic.Create(order);
                        check_duplicate_order = order;
                    }
                    var oderdetail = new OrderDetail
                    {
                        OrderID = check_duplicate_order.Id,
                        Quantity = paymentVnPay.quantity,
                        Price = paymentVnPay.Amount/100,
                        UserID = paymentVnPay.UserID,
                        Description = paymentVnPay.Description,
                        Type_Payment = "VNPAY",
                        Payment_ID = paymentVnPay.orderid,
                        Tour_Detail_ID = paymentVnPay.TourDetailID
                    };
                    await OrderDetailBusinessLogic.Create(oderdetail);
                    var list_orderdetail = await OrderDetailBusinessLogic.SelectAllOrderDetail2();
                    var totalOrderPrice = list_orderdetail.Sum(orderDetail => orderDetail.Price);
                    var totalOrderQuantity = list_orderdetail.Sum(orderDetail => orderDetail.Quantity);

                    check_duplicate_order.Price = totalOrderPrice;
                    check_duplicate_order.Number_people = totalOrderQuantity;
                    await OrderBusinessLogic.Update(check_duplicate_order);
                return "Successfully";

            }
            return "Payment failed";

        }
        
    }

}
