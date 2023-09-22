using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.ResortSpec
{
    public class SearchResortSpec : BaseSpecification<Resorts>
    {
        public SearchResortSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {
            Includes.Add(s => s.Location);
        }
    }
}
