using API.Models.Entity;
using API.Repository.Implement;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WebApiWithRoleAuthentication.Data;
using WebApiWithRoleAuthentication.Models.DTO;
using WebApiWithRoleAuthentication.Service.Interface;

namespace WebApiWithRoleAuthentication.Service.Implement
{
    public class ProductService:IProductService
    {
        private readonly IBaseRepository<Product> baseRepository;
        private readonly IProductRepository productRepository;

        public ProductService(IBaseRepository<Product> baseRepository, IProductRepository productRepository)
        {
            this.baseRepository = baseRepository;
            this.productRepository = productRepository;
        }

        public async Task<bool> AddAsync(ProductDTO entity)
        {
            Product item = new Product
            {
                Id = Guid.NewGuid().ToString(),
                Name = entity.Name,
                CategoryId= entity.CategoryId,
                Price = entity.Price,
                Quantity = entity.Quantity,
                Description = entity.Description,
                IsActive = true,
            };
            var rs = await baseRepository.AddAsync(item);
            return rs != null;
        }

        public async Task<(List<ProductDTO>,int)> GetAllAsync(string name, string categoryId, int page, int size)
        {
            (List<ProductDTO> productDTOs, int total) = await productRepository.GetAllAsync(name, categoryId, page, size);

            return (productDTOs, total);
        }




        public async Task<Product> GetByIdAsync(string id)
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

      

        public async Task<bool> UpdateAsync(ProductDTO entity)
        {
            var item = await baseRepository.GetByIdAsync(entity.Id);

            if (item == null)
            {
                return false;
            }

            item.Name = entity.Name;
            item.CategoryId=entity.CategoryId;
            item.Price=entity.Price;
            item.Quantity= entity.Quantity;
            item.Description = entity.Description;

            var result = await baseRepository.UpdateAsync(item);

            return result != null;
        }

        public async Task<(List<ProductDTO>, int)> GetBestSale(string name, int page, int size)
        {
            var query= await productRepository.GetBestSale(name,page, size);
            return query;
        }

        public async Task<(List<ProductDTO>, int)> GetList(string name, string categoryId, string sorting, int page, int size)
        {
            var query = await productRepository.GetList(name, categoryId, sorting, page, size);
            return query;

        }

        public async Task<Product> CheckQuantityProduct(string id, int quantity)
        {
            var query = await baseRepository.GetAllAsync();
            var product = query.Where(x => x.Id == id && x.Quantity >= quantity).FirstOrDefault();
            return product;
        }

    }
}
