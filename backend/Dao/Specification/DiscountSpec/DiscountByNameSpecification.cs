using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.DiscountSpec
{
    public class DiscountByNameSpecification : BaseSpecification<Discount>
    {
        public DiscountByNameSpecification(string discount)
        : base(hotel => hotel.Discount1.ToLower() == discount.ToLower())
        {
        }
    }
}
