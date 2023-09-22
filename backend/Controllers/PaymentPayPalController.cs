using backend.Model;
using backend.Model.Paypal.Capture;
using backend.Model.Paypal.Input;
using backend.Model.Paypal.Output;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace backend.Controllers
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class PaymentPayPalController : ControllerBase
    {
        public IConfiguration configuration;
        public HttpClient _client;
        public PaymentPayPalController(IConfiguration _configuration, HttpClient _httpClient)
        {
            configuration = _configuration;
            this._client = _httpClient;
        }
        [HttpGet]
        public async Task<AuthorizationResponseData> GetAuthorizationRequest()
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
    public async Task<PaypalCreateOrderOutput> CreateOrder()
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
                        name = "Tour du lich Viet Nam",
                        description = "DEMO PAYPAL",
                        quantity = "1",
                        unit_amount = new UnitAmountInput
                        {
                            currency_code = "USD",
                            value = "12121.00"
                        }
                    }
                },
                amount = new AmountInput
                {
                    currency_code = "USD",
                    value = "12121.00",
                    breakdown = new BreakdownInput
                    {
                        item_total = new ItemTotal
                        {
                            currency_code = "USD",
                            value = "12121.00"
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
        public async Task<PaypalCreateOrderOutput> GetOrderID(string orderid)
        {
            var token = await GetAuthorizationRequest();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);

            var response = await _client.GetAsync($"https://api-m.sandbox.paypal.com/v2/checkout/orders/{orderid}");

            var responseAsString = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<PaypalCreateOrderOutput>(responseAsString);

            return result;
        }


        [HttpPost]
        public async Task<CapturePayment> CapturePayment1(string orderid)
        {
            var token = await GetAuthorizationRequest();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);

            var response = await _client.GetAsync($"https://api-m.sandbox.paypal.com/v2/checkout/orders/"+orderid+"/capture");

            var responseAsString = await response.Content.ReadAsStringAsync();

            var result = JsonConvert.DeserializeObject<CapturePayment>(responseAsString);

            return result;
        }

    }
}
