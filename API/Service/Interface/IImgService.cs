using API.Models.DTO;
using API.Models.Entity;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Service.Interface
{
    public interface IImgService
    {
        public Task<bool> AddAsync(ImgDTO entity);
        public Task<List<Img>> GetImgByProductId(string productId);

    }
}
