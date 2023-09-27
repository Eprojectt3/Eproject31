using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.ServiceSpec
{
    public class SearchServiceSpec : BaseSpecification<Service>
    {
        public SearchServiceSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {
            Includes.Add(s => s.Tour);
        }
    }
}
