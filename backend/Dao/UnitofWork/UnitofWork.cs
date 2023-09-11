using System.Collections;
using webapi.Base;
using webapi.Dao.Repository;
using webapi.Data;

namespace webapi.Dao.UnitofWork
{
    public class UnitofWork : IUnitofWork
    {
        private DataContext context;
        private Hashtable _repositories;
        public UnitofWork(DataContext context, Hashtable hashtable)
        {
            this.context = context;
            this._repositories = hashtable;
        }
        public async Task<int> Complete()
        {
            return await context.SaveChangesAsync();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (_repositories == null) { _repositories = new Hashtable(); }

            var type = typeof(TEntity).Name;
            if (!_repositories.ContainsKey(type))
            {
                var repo = new GenericRepository<TEntity>(context);
                _repositories.Add(type, repo);
            }
            return _repositories[type] as IGenericRepository<TEntity>;
        }
    }
}
