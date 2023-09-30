using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.RestaurantSpec
{
    public class RestaurantDeleteItinerarySpec : BaseSpecification<Itinerary>
    {
        public RestaurantDeleteItinerarySpec(int restaurantId)
        : base(l => l.ParentId == restaurantId && l.Type == "Restaurant")
        {
        }
    }
}
