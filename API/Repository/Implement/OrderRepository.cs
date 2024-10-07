using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using WebApiWithRoleAuthentication.Data;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Repository.Implement
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext context;

        public OrderRepository(AppDbContext context)
        {
            this.context = context;
        }
        public async Task<(List<OrderDTO>, int)> ShowList(string name, int page, int size, string isActive)
        {
            var query = context.Orders
                 .Include(order => order.User)
                .Where(order => order.IsActive == isActive && (string.IsNullOrEmpty(name) || order.User.Name.Contains(name)))
                .Select(order => new OrderDTO
                {
                    Id = order.Id,
                    UserId = order.UserId,
                    OrderDate = order.OrderDate,
                    PaymentMethod = order.PaymentMethod,
                    IsActive = isActive,
                    FullName = order.User != null ? order.User.Name : null,

                    Name = order.Name,
                    Description = order.Description,
                    Address = order.Address,
                    PhoneNumber = order.PhoneNumber,

                    Total = order.OrderItems
                        .Select(item => new
                        {
                            ProductPrice = item.Product.Price,
                            Quantity = item.Quantity
                        })
                        .Sum(item => item.ProductPrice * item.Quantity)
                });

            int total = await query.CountAsync();

            // Get paginated results
            var orders = await query
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            return (orders, total);
        }


    }
}
