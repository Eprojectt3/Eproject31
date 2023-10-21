using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.HotelSpec
{
    public class PlaceTypeSpec : BaseSpecification<PlaceType>
    {
        public PlaceTypeSpec()
        {
            Includes.Add(query => query.Places);
        }
        
    }
}
