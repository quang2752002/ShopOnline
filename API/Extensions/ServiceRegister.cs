using API.Models.Entity;
using API.Repository.Implement;
using API.Repository.Interface;
using API.Service.Implement;
using API.Service.Interface;
using WebApiWithRoleAuthentication.Service.Implement;
using WebApiWithRoleAuthentication.Service.Interface;

namespace DiscApi.Extension
{
    public static class ServiceRegister
    {
        public static void Register(IServiceCollection services)
        {
            // Services
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IImgService, ImgService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IOrderService,OrderService>();
            services.AddScoped<IOrderItemService, OrderItemService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IVNPayService, VNPayService>();



            // Repositories 
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IBaseRepository<Product>, BaseRepository<Product>>();
            services.AddScoped<IBaseRepository<Order>, BaseRepository<Order>>();
            services.AddScoped<IBaseRepository<OrderItem>, BaseRepository<OrderItem>>();
            services.AddScoped<IBaseRepository<Cart>, BaseRepository<Cart>>();

            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderItemRepository, OrderItemRepository>();
            services.AddScoped<ICartRepository, CartRepository>();

            // Add other services or repositories here
        }
    }
}
