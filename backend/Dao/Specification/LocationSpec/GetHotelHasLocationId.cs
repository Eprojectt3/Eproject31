using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.LocationSpec
{
    public class GetHotelHasLocationId : BaseSpecification<Place>
    {
        public GetHotelHasLocationId(int locationId)
        : base(hotel => hotel.LocationId == locationId)
        {
        }
    }
}
