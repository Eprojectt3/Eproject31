using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.TourDetailSpec
{
    public class SearchTourDetailSpec : BaseSpecification<TourDetail>
    {
        public SearchTourDetailSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            l.tour.Name.ToLower().Contains(param.Search.ToLower())
        )
        {
            Includes.Add(s => s.tour);
        }
    }
}
