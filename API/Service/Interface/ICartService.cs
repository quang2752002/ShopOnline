using API.Models.DTO;

namespace API.Service.Interface
{
    public interface ICartService
    {
        public Task<(List<CartDTO>, int)> getCart(string userId,int page);
    }
}
