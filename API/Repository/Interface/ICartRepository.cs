using API.Models.DTO;
using API.Models.Entity;

namespace API.Repository.Interface
{
    public interface ICartRepository
    {
        public  Task<List<CartDTO>> getCart(string userId);
        public Task<Cart> CheckCart(string userId, string productId);

    }
}
