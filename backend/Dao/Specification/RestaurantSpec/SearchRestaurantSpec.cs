using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.RestaurantSpec
{
    public class SearchRestaurantSpec : BaseSpecification<Restaurant>
    {
        public SearchRestaurantSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {
            Includes.Add(s => s.Location);
        }
    }
}
