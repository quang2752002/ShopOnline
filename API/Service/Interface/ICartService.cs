using API.Models.DTO;

namespace API.Service.Interface
{
    public interface ICartService
    {
        public Task<List<CartDTO>> getCart(string userId);
        public Task<bool> AddCart(string userId, string productId, int quantity);
        public Task<bool> UpdateCart(string userId, string productId, int quantity);
        public Task<List<CartDTO>> getCartCheckOut(string[] Id);

    }

}
