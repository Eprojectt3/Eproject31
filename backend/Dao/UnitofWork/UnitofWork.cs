using Microsoft.EntityFrameworkCore.Storage;
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
        private IDbContextTransaction _transaction; // Thêm biến để theo dõi giao dịch

        public UnitofWork(DataContext context)
        {
            this.context = context;
        }

        public async Task<int> Complete()
        {
            try
            {
                if (_transaction != null)
                {
                    // Nếu giao dịch tồn tại và không có lỗi, thực hiện lưu thay đổi
                    await context.SaveChangesAsync();
                    _transaction.Commit();
                }
                return 1; // Hoàn thành thành công
            }
            catch (Exception)
            {
                if (_transaction != null)
                {
                    // Nếu có lỗi, thực hiện rollback
                    _transaction.Rollback();
                }
                return 0; // Có lỗi xảy ra
            }
            finally
            {
                if (_transaction != null)
                {
                    // Dọn dẹp tài nguyên sau khi hoàn thành
                    _transaction.Dispose();
                    _transaction = null;
                }
            }
        }

        public void BeginTransaction()
        {
            // Bắt đầu giao dịch
            _transaction = context.Database.BeginTransaction();
        }

        public void RollbackTransaction()
        {
            // Rollback giao dịch nếu cần
            if (_transaction != null)
            {
                _transaction.Rollback();
            }
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseCreateDate
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
