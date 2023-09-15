using webapi.Base;

namespace backend.Entity
{
    public class Hotel : BaseCreateDate
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int Rate { get; set; }
        public int LocatinId { get; set; }
        public Location1? Location1 { get; set; }
        public string? Description { get; set; }
        public int ImageDetail { get; set; }
        public string? Address { get; set; }
        public string? Image { get; set; }
        public int PhoneNumber { get; set; }
        public string? Links { get; set; }

    }
}
