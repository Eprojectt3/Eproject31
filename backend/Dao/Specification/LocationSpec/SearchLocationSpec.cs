using backend.Entity;
using Microsoft.Identity.Client;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.LocationSpec
{
    public class SearchLocationSpec:BaseSpecification<Location1>
    {
        public SearchLocationSpec(SpecParams param)
            :base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.State.ToLower())
        )
        {
            //ApplyPagination(param.PageSize * (param.PageIndex - 1), param.PageSize);
        }
    }
}
