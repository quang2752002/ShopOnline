using API.Models.Entity;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WebApiWithRoleAuthentication.Data;

namespace API.Repository.Implement
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly AppDbContext _dbContext;
        protected readonly DbSet<T> _dbSet;

        public BaseRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        /**
         * Retrieves an entity by its ID.
         * @param id The ID of the entity.
         * @return The entity with the specified ID.
         */
        public async Task<T> GetByIdAsync(string id)
        {
            T entity = await _dbSet.FindAsync(id);
            return entity;
        }

        /**
         * Retrieves all entities.
         * @return A list of all entities.
         */
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var entityList = await _dbSet.ToListAsync();
            return entityList;
        }

        /**
         * Adds a new entity.
         * @param entity The entity to be added.
         * @return The added entity.
         */
        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        /**
         * Updates an existing entity.
         * @param entity The entity to be updated.
         * @return The updated entity.
         */
        public async Task<T> UpdateAsync(T entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        /**
         * Removes an entity.
         * @param entity The entity to be removed.
         * @return The ID of the removed entity.
         */
        public async Task<string> RemoveAsync(T entity)
        {
            _dbContext.Remove(entity);
            await _dbContext.SaveChangesAsync();
            return entity.Id;
        }

        /**
         * Searches for entities based on a predicate.
         * @param predicate The search criteria.
         * @return A list of entities that match the search criteria.
         */
        public async Task<IEnumerable<T>> SearchAsync(Expression<Func<T, bool>> predicate)
        {
            var result = await _dbSet.Where(predicate).ToListAsync();
            return result;
        }

        public async Task<T> DeleteAsync(string id)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"Entity with id {id} not found.");
            }

            _dbSet.Remove(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

    }
}
