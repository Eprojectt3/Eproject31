using System.ComponentModel;

namespace backend.Entity
{
    public class Tour
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int category_id { get; set; }
        public Category? category { get; set; }
        public string Description { get; set; }
        public string? image { get; set; }
        //Xác định tour theo yêu cầu hay tour theo lộ trình
        public bool? Type { get;set; }
        public int Transportation_ID { get; set; }
        public Transportation? Transportation { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int? discount_Id { get; set; }
        public Discount? discount { get; set; }
    }
}
