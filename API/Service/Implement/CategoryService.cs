using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Interface;
using API.Service.Interface;
using System.Linq.Expressions;
using WebApiWithRoleAuthentication.Data;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Service.Implement
{
    public class CategoryService : ICategoryService
    {
        private readonly IBaseRepository<Category> baseRepository;

        public CategoryService(IBaseRepository<Category> baseRepository)
        {
            this.baseRepository = baseRepository;
        }

        public async Task<bool> AddAsync(CategoryDTO entity)
        {
            Category item = new Category
            {
                Id = Guid.NewGuid().ToString(),
                Name=entity.Name,
                Description=entity.Description,
                IsActive=true,
            };
            var rs = await baseRepository.AddAsync(item);
            return rs != null;
        }

        public async Task<(List<Category>, int)> GetAllAsync(string name, int page, int size)
        {
            var categories = await baseRepository.GetAllAsync();

            categories = categories.Where(p => p.IsActive == true);

            if (!string.IsNullOrEmpty(name))
            {
                categories = categories.Where(p => p.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
            }

            categories = categories.OrderBy(p => p.Name);

            int total = categories.Count();

            var query = categories.Skip((page - 1) * size).Take(size).ToList();

            return (query, total);
        }


        public async Task<Category> GetByIdAsync(string id)
        {
            var query = await baseRepository.GetByIdAsync(id);
            return query;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var item = await baseRepository.GetByIdAsync(id);
            if (item == null)
            {
                return false;
            }
            item.IsActive = false;
            var result = await baseRepository.UpdateAsync(item);

            return result != null;
        }



        public async Task<bool> UpdateAsync(CategoryDTO entity)
        {
            var item = await baseRepository.GetByIdAsync(entity.Id);

            if (item == null)
            {
                return false; 
            }

            item.Name = entity.Name;
            item.Description = entity.Description;
            item.IsActive = entity.IsActive.Value; 

            var result = await baseRepository.UpdateAsync(item);

            return result != null;
        }

        public async Task<List<Category>> getListAsync()
        {
            var query = await baseRepository.GetAllAsync();
            query = query.Where(p => p.IsActive == true);

            return query.ToList();
        }
    }
}
