using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.DiscountSpec
{
    public class SearchDiscountSpec : BaseSpecification<Discount>
    {
        public SearchDiscountSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Discount1.ToLower())
        )
        {
            //ApplyPagination(param.PageSize * (param.PageIndex - 1), param.PageSize);
        }
    }
}
