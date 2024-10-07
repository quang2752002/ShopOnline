using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Implement;
using API.Repository.Interface;
using API.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using WebApiWithRoleAuthentication.Data;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Service.Implement
{
    public class ImgService : IImgService
    {
        private readonly IBaseRepository<Img> baseRepository;

        public ImgService(IBaseRepository<Img> baseRepository)
        {
            this.baseRepository = baseRepository;
        }

        public async Task<bool> AddAsync(ImgDTO entity)
        {
            
            Img item = new Img
            {
                Id = Guid.NewGuid().ToString(), 
                Url = entity.Url,
                ProductId = entity.ProductId
            };

            var result = await baseRepository.AddAsync(item);

            return result != null;
        }


       public async Task<List<Img>> GetImgByProductId(string productId)
        {
            var query = await baseRepository.GetAllAsync();
            var imgs =  query.Where(x => x.ProductId == productId).ToList();
            return imgs;
        }
    }
}
