using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification
{
    public class CategoryByNameSpecification: BaseSpecification<Category>
    
    {
        public CategoryByNameSpecification(string categoryName)
        : base(category => category.Name.ToLower() == categoryName.ToLower())
        {
        }
    }
}
