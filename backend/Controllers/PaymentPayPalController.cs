﻿using backend.BussinessLogic;
using backend.Dao.Specification.Order1;
using backend.Dtos.OrderDetailDtos;
using backend.Dtos.PaymentDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using backend.Model;
using backend.Model.Paypal.Capture;
using backend.Model.Paypal.Input;
using backend.Model.Paypal.Output;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StackExchange.Redis;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using webapi.Dao.UnitofWork;

namespace backend.Controllers
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class PaymentPayPalController : ControllerBase
    {
        public IConfiguration configuration;
        public HttpClient _client;
        public IUnitofWork unitofWork;
        public OrderBusinessLogic OrderBusinessLogic;
        public OrderDetailBusinessLogic OrderDetailBusinessLogic;
        public UserBussinessLogic UserBussinessLogic;
        public TourDetailBusinessLogic TourDetailBusinessLogic;
        public PaymentPayPalController(IConfiguration _configuration, HttpClient _httpClient, 
            IUnitofWork _unitofWork, OrderBusinessLogic _OrderBusinessLogic, OrderDetailBusinessLogic _OrderDetailBusinessLogic
            , UserBussinessLogic userBussinessLogic, TourDetailBusinessLogic tourDetailBusinessLogic)
        {
            configuration = _configuration;
            this._client = _httpClient;
            unitofWork = _unitofWork;
            OrderBusinessLogic = _OrderBusinessLogic;
            OrderDetailBusinessLogic = _OrderDetailBusinessLogic;
            UserBussinessLogic = userBussinessLogic;
            TourDetailBusinessLogic = tourDetailBusinessLogic;
        }
        [HttpGet]
        public async Task<AuthorizationResponseData?> GetAuthorizationRequest()
        {
            var clientID = configuration.GetSection("PayPal").GetSection("ClientId").Value;
            var clientSecret = configuration.GetSection("Paypal").GetSection("ClientSecret").Value;
            //var baseUrl = configuration.GetSection("Paypal").GetSection("BaseUrl").Value;
            //_client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var byteArray = Encoding.ASCII.GetBytes($"{clientID}:{clientSecret}");
            _client.DefaultRequestHeaders.Add("Authorization", "Basic " + Convert.ToBase64String(byteArray));

            List<KeyValuePair<string, string>> postData = new List<KeyValuePair<string, string>>();

            postData.Add(new KeyValuePair<string, string>("grant_type", "client_credentials"));

            HttpResponseMessage response = await _client.PostAsync("https://api-m.sandbox.paypal.com/v1/oauth2/token", new FormUrlEncodedContent(postData));

            var responseAsString = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                var authorizationResponse = JsonConvert.DeserializeObject<AuthorizationResponseData>(responseAsString);
                if(authorizationResponse == null)
                {
                    throw new NotFoundExceptions("Không tìm thấy");
                }
                return authorizationResponse;
            }
            else
            {
                // Phản hồi không thành công, hiển thị nội dung lỗi
                Console.WriteLine("Lỗi phản hồi từ PayPal:");
                Console.WriteLine(responseAsString);
            }

            return null;

        }

     [HttpPost]
    public async Task<PaypalCreateOrderOutput> CreateOrder(OrderDetailDtos orderDetail)
    {
        var token = await GetAuthorizationRequest();

        var paypalInput = new PaypalCreateOrderInput
        {
            intent = "CAPTURE",
            purchase_units = new List<PurchaseUnitInput>
        {
            new PurchaseUnitInput
            {
                items = new List<ItemInput>
                {
                    new ItemInput
                    {
                        name = orderDetail.Name,
                        description = orderDetail.Description,
                        quantity = orderDetail.quantity,
                        unit_amount = new UnitAmountInput
                        {
                            currency_code = "USD",
                            value =  orderDetail.Price
                        }
                    }
                },
                amount = new AmountInput
                {
                    currency_code = "USD",
                    value = (int.Parse(orderDetail.Price)*int.Parse(orderDetail.quantity)).ToString(),
                    breakdown = new BreakdownInput
                    {
                        item_total = new ItemTotalInput
                        {
                            currency_code = "USD",
                            value = (int.Parse(orderDetail.Price)*int.Parse(orderDetail.quantity)).ToString()
                        }

                    }
                }
            }
        },
            application_context = new ApplicationContext
            {
                return_url = "https://example.com/return",
                cancel_url = "https://example.com/cancel"
            }
        };

        //_client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token.access_token);


            var requestContent = JsonConvert.SerializeObject(paypalInput);
            //_client.DefaultRequestHeaders.Remove("Authorization");
            //_client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token.access_token);
            //_client.SetBearerToken(token.access_token);
            

            var httpRequestMessage = new HttpRequestMessage
            {
                Content = new StringContent(requestContent, new MediaTypeHeaderValue("application/json"))
            };
            // Đặt giá trị "Content-Type"
            httpRequestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            // Tạo một giá trị ngẫu nhiên cho "PayPal-Request-Id" (hoặc bạn có thể sử dụng giá trị duy nhất khác)
            var payPalRequestId = Guid.NewGuid().ToString();
            httpRequestMessage.Headers.Add("PayPal-Request-Id", payPalRequestId);

            httpRequestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);

            httpRequestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await _client.PostAsync("https://api-m.sandbox.paypal.com/v2/checkout/orders", httpRequestMessage.Content);
            var responseAsString = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<PaypalCreateOrderOutput>(responseAsString);
         
            return result;

    }
        [HttpGet]
        public async Task<ActionResult> GetOrderID(string orderid)
        {
            var token = await GetAuthorizationRequest();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);

            var response = await _client.GetAsync($"https://api-m.sandbox.paypal.com/v2/checkout/orders/{orderid}");

            var responseAsString = await response.Content.ReadAsStringAsync();
            var result_complete = JsonConvert.DeserializeObject<GetOrderDtos>(responseAsString);
         
            if (result_complete.status == "COMPLETE")
            {
                var result = GetCapturePayment(responseAsString);               
                return Ok(result);

            }
            else
            {
                var result = GetPaymentOutPutCreate(responseAsString);
                return Ok(result);
            }

        }
        [HttpGet]
        public async Task<CapturePayment> GetCapturePayment(string json)
        {
            var result_complete = JsonConvert.DeserializeObject<CapturePayment>(json);
            return result_complete;

        }
        [HttpGet]
        public async Task<PaypalCreateOrderOutput> GetPaymentOutPutCreate(string json)
        {
            var result_complete = JsonConvert.DeserializeObject<PaypalCreateOrderOutput>(json);
            return result_complete;

        }

        /// <summary>
        /// kiểm tra xem TOURDETAILID,UserID này có trongdatabase chưa
        /// Tìm kiếm xem có order này theo TourDetailID chưa
        /// nếu chưa thì
        ///       Tạo Order trước dựa trên TourDetailID: Tour_Detail_ID,
        /// Sau đó lưu vào OrderDetail có cột OrderID, Quantity, Price,UserID,Description,Type_Paymen,PAYMENT_ID
        ///        Update bảng Order Price, Quantity bằng cách lấy hết dữ liệu có trong Orderdetail và loop để lấy Price và Quantity
        /// </summary>
        /// <param name="orderid"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CapturePayment1(PaymentPayPalDtos payment)
        {
            var token = await GetAuthorizationRequest();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
             
            var captureData = new { note_to_payer = "Capture payment for order " + payment.orderid }; // Thay thế bằng thông tin cần thiết

          
            var captureJson = JsonConvert.SerializeObject(captureData);

            // Tạo nội dung yêu cầu
            var requestContent = new StringContent(captureJson, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("https://api-m.sandbox.paypal.com/v2/checkout/orders/" + payment.orderid + "/capture", requestContent);

            var responseAsString = await response.Content.ReadAsStringAsync();
            var check = JsonConvert.DeserializeObject<CapturePayment>(responseAsString);

            if (check.status == "COMPLETED")
            {
                //var user = UserBussinessLogic.GetUserByCondition(payment.UserID);
                var tour_detail = TourDetailBusinessLogic.GetTourDetailAsync(payment.TourDetailID);
                /*
                if (user == null || tour_detail == null)
                {
                    throw new NotFoundExceptions("You have successfully paid but encounter problems during processing, please contact management");
                }
                */
                if ( tour_detail == null)
                {
                    throw new NotFoundExceptions("You have successfully paid but encounter problems during processing, please contact management");
                }

                var response_capture = await _client.GetAsync($"https://api-m.sandbox.paypal.com/v2/checkout/orders/{payment.orderid}"); 
                var responseAsString_capture = await response_capture.Content.ReadAsStringAsync();
                var result = await GetCapturePayment(responseAsString_capture);

                var check_duplicate_order = await OrderBusinessLogic.GetEntityByCondition(payment.TourDetailID);
                if (check_duplicate_order == null)
                {
                    var order = new Entity.Order();
                    order.Tour_Detail_ID = payment.TourDetailID;
                    var check_create_order = OrderBusinessLogic.Create(order);
                    check_duplicate_order = order;
                }
                var oderdetail = new OrderDetail
                {
                    OrderID = check_duplicate_order.Id,
                    Quantity = int.Parse(result.purchase_units[0].items[0].quantity),
                    Price = Double.Parse(result.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value)*23000,
                    UserID = payment.UserID,
                    Description = result.purchase_units[0].items[0].description + " |Paypal fee: " + Double.Parse(result.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value)*23000,
                    Type_Payment = "PayPal",
                    Payment_ID = result.id,
                    Tour_Detail_ID = payment.TourDetailID
                };
                await OrderDetailBusinessLogic.Create(oderdetail);
                var list_orderdetail = await OrderDetailBusinessLogic.SelectAllOrderDetail2();
                var totalOrderPrice = list_orderdetail.Sum(orderDetail => orderDetail.Price);
                var totalOrderQuantity = list_orderdetail.Sum(orderDetail => orderDetail.Quantity);

                check_duplicate_order.Price = totalOrderPrice;
                check_duplicate_order.Number_people = totalOrderQuantity;
                await OrderBusinessLogic.Update(check_duplicate_order);
            }
                 
            return Ok("successfully");
        }

    }
}