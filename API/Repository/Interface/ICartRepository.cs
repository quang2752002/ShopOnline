using API.Models.DTO;
using API.Models.Entity;

namespace API.Repository.Interface
{
    public interface ICartRepository
    {
        public  Task<(List<CartDTO>,int)> getCart(string userId,int page);
        public Task<Cart> CheckCart(string userId, string productId);

    }
}
