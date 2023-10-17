using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.HotelSpec
{
    public class HotelByAddressSpecification : BaseSpecification<Place>
    {
        public HotelByAddressSpecification(string hotelAddress , int id)
        : base(hotel => hotel.Address.ToLower() == hotelAddress.ToLower() && hotel.Id != id)
        {
        }
    }
}
