using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.TourSpec
{
    public class SearchTourSpec : BaseSpecification<Tour>
    {
        public SearchTourSpec(TourSpecParams param)
            : base(l =>
            (string.IsNullOrEmpty(param.Search) ||
            l.Name.ToLower().Contains(param.Search.ToLower())) &&
                (param.Category_Tour == null || l.category.Name.Contains(param.Category_Tour)) &&
                (param.Rating == null || l.Rating == param.Rating) &&
                (param.Price == null || l.Price == param.Price) 
            //&&
            //    (param.Departure_Time == null || l.TourDetail == param.Rating)
        )
        {
            Includes.Add(s => s.category);
            Includes.Add(s => s.TourDetail);
        }
    }
}
