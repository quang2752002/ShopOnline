using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Implement;
using API.Repository.Interface;
using API.Service.Interface;
using WebApiWithRoleAuthentication.Service.Interface;

namespace API.Service.Implement
{
    public class CartService : ICartService
    {
        private readonly IBaseRepository<Cart> baseRepository;
        private readonly ICartRepository cartRepository;
        private readonly IProductService productService;

        public CartService(IBaseRepository<Cart> baseRepository, ICartRepository cartRepository, IProductService productService)
        {
            this.baseRepository = baseRepository;
            this.cartRepository = cartRepository;
            this.productService = productService;
        }

        public async Task<bool> AddOrUpdateCart(string userId, string productId, int quantity)
        {
            if (await cartRepository.CheckCart(userId, productId) == null)
            {
                if (await productService.CheckQuantityProduct(productId, quantity)!=null)
                {
                    Cart item = new Cart()
                    {
                        ProductId = productId,
                        Quantity = quantity,
                        UserId = userId
                    };
                    await baseRepository.AddAsync(item);
                    return true;
                }
               
            }
            else
            {

                Cart cart = await cartRepository.CheckCart(userId, productId);
                
                cart.Quantity = cart.Quantity + quantity;
                if (await productService.CheckQuantityProduct(productId, cart.Quantity)!=null)
                {
                    await baseRepository.UpdateAsync(cart);
                    return true;
                }
               
            }
            return false;
        }

        public async Task<(List<CartDTO>, int)> getCart(string userId, int page)
        {
            var query = await cartRepository.getCart(userId,page);
            return query;
        }

    }
}
