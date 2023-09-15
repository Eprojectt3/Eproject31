using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification
{
    public class RestaurantByAddressSpecification : BaseSpecification<Restaurant>
    {
        public RestaurantByAddressSpecification(string restaurantAddress)
        : base(res => res.Address.ToLower() == restaurantAddress.ToLower())
        {
        }
    }
}
