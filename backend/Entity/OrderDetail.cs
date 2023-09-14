namespace backend.Entity
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderID { get; set; }
        public Order? Order { get; set; }
        public int quantity { get; set; }
        public double price { get; set; }
        public DateTime Create_Date { get;set; }
        public DateTime End_Date { get;set;}
        public int TourID { get; set; }
        public Tour? tour { get; set; }
    }
}
