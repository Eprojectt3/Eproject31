using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.ItinerarySpec
{
    public class SearchItinerarySpec : BaseSpecification<Itinerary>
    {
        public SearchItinerarySpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            l.tour.Name.ToLower().Contains(param.Search.ToLower())
        )
        {
            Includes.Add(s => s.tour);
        }
    }
}
