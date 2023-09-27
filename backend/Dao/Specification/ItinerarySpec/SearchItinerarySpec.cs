using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.ItinerarySpec
{
    public class SearchItinerarySpec : BaseSpecification<Itinerary>
    {
        public SearchItinerarySpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.tour.Name.ToLower())
        )
        {
            Includes.Add(s => s.tour);
        }
    }
}
