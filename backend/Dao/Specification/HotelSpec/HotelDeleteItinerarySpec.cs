using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.HotelSpec
{
    public class HotelDeleteItinerarySpec : BaseSpecification<Itinerary>
    {
        public HotelDeleteItinerarySpec( int HotelId)
        : base(l =>l.ParentId == HotelId && l.Type == "Hotel")         
        {
        }
    }
}
