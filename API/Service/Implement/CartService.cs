using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Implement;
using API.Repository.Interface;
using API.Service.Interface;
using NuGet.Packaging.Signing;
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

        public async Task<bool> AddCart(string userId, string productId, int quantity)
        {
            if (await cartRepository.CheckCart(userId, productId) == null)
            {
                if (await productService.CheckQuantityProduct(productId, quantity)!=null)
                {
                    Cart item = new Cart()
                    {
                        Id = Guid.NewGuid().ToString(),
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

        public async Task<List<CartDTO>> getCart(string userId)
        {
            var query = await cartRepository.getCart(userId);
            return query;
        }

       

        public async Task<List<CartDTO>> getCartCheckOut(string[] Id)
        {
            List<CartDTO> cartDTOs = new List<CartDTO>();

            foreach (var id in Id)
            {
                var cart = await baseRepository.GetByIdAsync(id);
                var product= await productService.GetByIdAsync(cart.ProductId);

                if (cart != null)
                {
                    CartDTO cartDTO = new CartDTO
                    {
                        Id = cart.Id,
                        ProductName = product.Name,
                        ProductId = cart.Id,
                        Quantity = cart.Quantity,
                        Price = product.Price,
                        Description = product.Description,
                       // Img = cart.Product.Imgs.Any() ? cart.Product.Imgs.FirstOrDefault().Url : null

                    };

                    cartDTOs.Add(cartDTO);
                }
            }

            return cartDTOs;
        }

        public async Task<bool> UpdateCart(string userId, string productId, int quantity)
        {
            Cart cart=await cartRepository.CheckCart(userId,productId);
            cart.Quantity = quantity;
            if (await productService.CheckQuantityProduct(productId, cart.Quantity) != null)
            {
                await baseRepository.UpdateAsync(cart);
                return true;
            }
            return false;
        }
    }
}
