using webapi.Base;

namespace backend.Entity
{
    public class Discount:BaseCreateDate
    {
        public int Id { get; set; }
        public int discount { get; set; }
        public string? type { get; set; }
        public bool isActive { get; set; } = true;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Tour? Tour { get; set; }
        
    }
}
