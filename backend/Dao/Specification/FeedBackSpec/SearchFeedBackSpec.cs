using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.FeedBackSpec
{
    public class SearchFeedBackSpec : BaseSpecification<FeedBack>
    {
        public SearchFeedBackSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {
    
        }
    }
}
