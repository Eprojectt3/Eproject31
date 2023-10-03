using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.OrderSpec
{
    public class RevenueByDay : BaseSpecification<Order>
    {
        public RevenueByDay(int year, int month ,int day)
        : base(query => query.CreateDate.Value.Year == year && query.CreateDate.Value.Month == month && query.CreateDate.Value.Day == day)
        {
        }
    }
}
