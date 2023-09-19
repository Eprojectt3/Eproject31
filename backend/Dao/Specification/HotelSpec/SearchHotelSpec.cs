using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.HotelSpec
{
    public class SearchHotelSpec : BaseSpecification<Hotel>
    {
        public SearchHotelSpec(SpecParams param)
        : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {
            Includes.Add(s => s.location1);
        }
    }
}
