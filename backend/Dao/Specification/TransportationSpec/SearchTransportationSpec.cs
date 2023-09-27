using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.TransportationSpec
{
    public class SearchTransportationSpec : BaseSpecification<Transportation>
    {
        public SearchTransportationSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {           
        }
    }
}
