using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.TourDetailSpec
{
    public class SearchTourDetailSpec : BaseSpecification<TourDetail>
    {
        public SearchTourDetailSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.tour.Name.ToLower())
        )
        {
            Includes.Add(s => s.tour);
        }
    }
}
