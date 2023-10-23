using backend.Entity;

namespace backend.Dtos.OrderDetaiDtos
{
    public class OrderDetailWithTourDto
    {
        public int? Id { get; set; }
        public int? OrderID { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public string? User_Name { get; set; }
        public string? Description { get; set; }
        public int? Tour_Detail_ID { get; set; }
        public int? Rating { get; set; } = 0;
        public string? Type_Payment { get; set; } 
        public string? Payment_ID { get; set; }
        public string? TourName {  get; set; }
    }
}
