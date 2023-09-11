using System.Runtime.Serialization;

namespace backend.Model.Paypal.Capture
{
    public class CapturePayment
    {
        public string id { get; set; }
        public string status { get; set; }
        public Amount amount { get; set; }
        public SellerProtection seller_protection { get; set; }
        public bool final_capture { get; set; }
        public string disbursement_mode { get; set; }
        public SellerReceivableBreakdown seller_receivable_breakdown { get; set; }
        public DateTime create_time { get; set; }
        public DateTime update_time { get; set; }
        [DataMember(Name = "Link")]

        public List<LinkCapture> links { get; set; }
    }
    public class Amount
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }
    public class SellerProtection
    {
        public string status { get; set; }
        public List<string> dispute_categories { get; set; }
    }
    public class SellerReceivableBreakdown
    {
        public GrossAmount gross_amount { get; set; }
        public PaypalFee paypal_fee { get; set; }
        public NetAmount net_amount { get; set; }
    }
    public class LinkCapture
    {
        public string href { get; set; }
        public string rel { get; set; }
        public string method { get; set; }
    }
    public class GrossAmount
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }
    public class PaypalFee
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }
    public class NetAmount
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }
}
