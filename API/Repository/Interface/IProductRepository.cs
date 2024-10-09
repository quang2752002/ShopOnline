using API.Models.Entity;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Repository.Interface
{
    public interface IProductRepository
    {
        public Task<(List<ProductDTO> , int )> GetAllAsync(string name, string categoryId, int page, int size);
        public Task<(List<ProductDTO>, int)> GetBestSale(string name, int page, int size);

        public Task<(List<ProductDTO>, int)> GetList(string name, string categoryId, string sorting, int page, int size);
     


    }
}
