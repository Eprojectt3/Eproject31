using System.Security.Policy;

namespace backend.Dtos.PaymentDtos
{
    public class PaymentPayPalDtos
    {
        public int TourDetailID { get; set; }
        public int UserID { get; set; }
        public string orderid { get; set; }  //Trong vnpay là vnp_TxnRef còn PayPal là ID
    }
}