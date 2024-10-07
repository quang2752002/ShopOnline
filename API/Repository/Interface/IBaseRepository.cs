using System.Linq.Expressions;

namespace API.Repository.Interface
{
    public interface IBaseRepository<T> where T : class
    {
        public Task<T> GetByIdAsync(string id);

        public Task<IEnumerable<T>> GetAllAsync();

        public Task<T> AddAsync(T entity);


        public Task<T> UpdateAsync(T entity);

        public Task<string> RemoveAsync(T entity);

        public Task<IEnumerable<T>> SearchAsync(Expression<Func<T, bool>> predicate);

        public Task<T> DeleteAsync(string id);

    }
}
