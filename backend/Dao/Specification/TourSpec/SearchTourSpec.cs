using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.TourSpec
{
    public class SearchTourSpec : BaseSpecification<Tour>
    {
        public SearchTourSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {
            Includes.Add(s => s.category);
        }
    }
}
