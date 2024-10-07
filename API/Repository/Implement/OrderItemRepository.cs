using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Interface;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using WebApiWithRoleAuthentication.Data;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Repository.Implement
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly AppDbContext context;

        public OrderItemRepository(AppDbContext context)
        {
            this.context = context;
        }
        public async Task<List<OrderItemDTO>> GetByIdOrder(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var query = context.OrderItems.AsQueryable();

                // Filter by Order ID
                query = query.Where(p => p.OrderId == id);

                // Project to DTO
                var orderItems = await query.Select(p => new OrderItemDTO
                {
                    Id = p.Id,
                    OrderId = p.OrderId,
                    ProductId = p.ProductId,
                    Price = p.Product.Price,
                    Quantity=p.Quantity,
                    ProductName = p.Product.Name,
                    Img = p.Product.Imgs.Any() ? p.Product.Imgs.FirstOrDefault().Url : null 
                }).ToListAsync();

                return orderItems;
            }

            return new List<OrderItemDTO>();
        }

    }
}
