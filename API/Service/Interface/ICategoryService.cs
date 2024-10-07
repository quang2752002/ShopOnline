using API.Models.DTO;
using API.Models.Entity;
using System.Linq.Expressions;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Service.Interface
{
    public interface ICategoryService
    {
        public Task<Category> GetByIdAsync(string id);
        public Task<(List<Category>, int Total)> GetAllAsync(string name, int page, int size);
        public Task<bool> AddAsync(CategoryDTO entity);
        public Task<bool> UpdateAsync(CategoryDTO entity);
        public Task<bool> DeleteAsync(string id);
        public Task<List<Category>> getListAsync();
    }
}
