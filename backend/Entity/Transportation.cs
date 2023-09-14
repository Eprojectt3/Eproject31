using webapi.Base;

namespace backend.Entity
{
    public class Transportation : BaseCreateDate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string? Description { get; set; }
        
    }
}
