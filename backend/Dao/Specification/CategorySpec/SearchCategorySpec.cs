using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.CategorySpec
{
    public class SearchCategorySpec : BaseSpecification<Category>
    {
        public SearchCategorySpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())
        )
        {
            
        }
    }
}
