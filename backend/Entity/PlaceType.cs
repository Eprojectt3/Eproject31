using webapi.Base;

namespace backend.Entity
{
    public class PlaceType : BaseCreateDate
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<Place>? Places { get; set;}
        public ICollection<Itinerary>? Itineraries { get; set; }
    }
}
