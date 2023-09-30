using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.HotelSpec
{
    public class SearchHotelSpec : BaseSpecification<Hotel>
    {
        public SearchHotelSpec(SpecParams param)
        : base(l =>
            (string.IsNullOrEmpty(param.Search) ||
              l.Name.ToLower().Contains(param.Search)) &&
                (param.Location == null || l.location1.State.ToLower().Contains( param.Location)) &&
                (param.Rating == null || l.Rating == param.Rating)
        )
        {
            Includes.Add(s => s.location1);
        }
    }
}
