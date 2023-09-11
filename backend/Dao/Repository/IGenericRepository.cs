using webapi.Base;
using webapi.Dao.Specification;

namespace webapi.Dao.Repository
{
    public interface IGenericRepository<T>
        where T : BaseEntity
    {
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);

        //Có điền kiện
        Task<IReadOnlyList<T>> GetAllWithAsync(ISpecification<T> spec);

        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
