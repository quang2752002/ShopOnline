using API.Models.Entity;
using System.Linq.Expressions;
using WebApiWithRoleAuthentication.Models.DTO;

namespace WebApiWithRoleAuthentication.Service.Interface
{
    public interface IProductService
    {
        public Task<Product> GetByIdAsync(string id);
        public Task<(List<ProductDTO> Products, int Total)> GetAllAsync(string name, string categoryId, int page, int size);
        public Task<bool> AddAsync(ProductDTO entity);
        public Task<bool> UpdateAsync(ProductDTO entity);
        public Task<bool> DeleteAsync(string id);
        public Task<(List<ProductDTO>, int)> GetBestSale(string name, int page, int size);
        public Task<(List<ProductDTO>, int)> GetList(string name, string categoryId, string sorting, int page, int size);
        public Task<Product> CheckQuantityProduct(string Id, int quantity);

    }
}
