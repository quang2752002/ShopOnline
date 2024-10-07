using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Interface;
using API.Service.Interface;

namespace API.Service.Implement
{
    public class CartService : ICartService
    {
        private readonly IBaseRepository<Cart> baseRepository;
        private readonly ICartRepository cartRepository;

        public CartService(IBaseRepository<Cart> baseRepository, ICartRepository cartRepository)
        {
            this.baseRepository = baseRepository;
            this.cartRepository = cartRepository;
        }

        public async Task<(List<CartDTO>, int)> getCart(string userId, int page)
        {
            var query = await cartRepository.getCart(userId,page);
            return query;
        }

    }
}
