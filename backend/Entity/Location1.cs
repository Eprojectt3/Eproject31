using webapi.Base;

namespace backend.Entity
{
    public class Location1 : BaseCreateDate
    {
        public int ID { get; set; }
        public string State { get; set; }
        public ICollection<Hotel>? Hotels { get; set; }
        public ICollection<Resorts>? Resorts { get; set; }

        public ICollection<Restaurant>? Restaurant { get; set; }
    }
}
