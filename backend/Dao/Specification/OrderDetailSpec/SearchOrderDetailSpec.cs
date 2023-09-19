using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.OrderDetailSpec
{
    public class SearchOrderDetailSpec : BaseSpecification<OrderDetail>
    {
        public SearchOrderDetailSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Users.Name.ToLower())
        )
        {
            Includes.Add(s => s.Users);
        }
    }
}