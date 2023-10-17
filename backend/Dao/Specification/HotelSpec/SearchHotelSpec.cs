using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.HotelSpec
{
    public class SearchHotelSpec : BaseSpecification<Place>
    {
        public SearchHotelSpec(SpecParams param)
        : base(l =>
            (string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())) &&
                (param.Location == null || l.location1.State.ToLower().Contains(param.Location)) &&
                (param.Rating == null || l.Rating == param.Rating) && (param.IsActive == null || l.IsActive == param.IsActive)
               && (param.Place_Type_ID == null || l.Place_Type_ID == param.Place_Type_ID)
        )
        {
            Includes.Add(s => s.location1);
        }
    }
}
