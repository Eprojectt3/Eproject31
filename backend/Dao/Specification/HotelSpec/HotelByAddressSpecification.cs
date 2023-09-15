using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.HotelSpec
{
    public class HotelByAddressSpecification : BaseSpecification<Hotel>
    {
        public HotelByAddressSpecification(string hotelAddress)
        : base(hotel => hotel.Address.ToLower() == hotelAddress.ToLower())
        {
        }
    }
}
