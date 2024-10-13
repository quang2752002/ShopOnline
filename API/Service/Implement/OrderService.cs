using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Implement;
using API.Repository.Interface;
using API.Service.Interface;
using WebApiWithRoleAuthentication.Data;
using static NuGet.Packaging.PackagingConstants;

namespace API.Service.Implement
{
    public class OrderService : IOrderService
    {
        private readonly IBaseRepository<Order> baseRepository;
        private readonly IBaseRepository<Cart> cartBaseRepository;
        private readonly IBaseRepository<Product> productBaseRepository;
        private readonly IBaseRepository<OrderItem> orderItemBaseRepository;
        private readonly IOrderRepository orderRepository;

        public OrderService(IBaseRepository<Order> baseRepository, IBaseRepository<Cart> cartBaseRepository, IBaseRepository<Product> productBaseRepository, IBaseRepository<OrderItem> orderItemBaseRepository, IOrderRepository orderRepository)
        {
            this.baseRepository = baseRepository;
            this.cartBaseRepository = cartBaseRepository;
            this.productBaseRepository = productBaseRepository;
            this.orderItemBaseRepository = orderItemBaseRepository;
            this.orderRepository = orderRepository;
        }

        public async Task<bool> AddAsync(OrderDTO entity)
        {
            Order item = new Order
            {
                Id = Guid.NewGuid().ToString(),
                Name = entity.Name,
                UserId = entity.UserId,
                OrderDate = DateTime.Now,
                PaymentMethod=entity.PaymentMethod,
                IsActive=entity.IsActive,
                Description=entity.Description,
                Address=entity.Description,
                PhoneNumber=entity.PhoneNumber,
            };
            var rs = await baseRepository.AddAsync(item);
            return rs != null;
        }

        public async Task<bool> ChangeIsActive(string id,string isActive)
        {
            var item=await baseRepository.GetByIdAsync(id);
            if (item == null)
            {
                return false;
            }
            item.IsActive = isActive;
            var query= await baseRepository.UpdateAsync(item);
            return query != null;
        }

        
        public async Task<(List<OrderDTO>,int)> ShowList(string name, int page, int size, string isActive)
        {
            (List<OrderDTO> orders,int total)= await orderRepository.ShowList(name,page, size, isActive);
            return (orders, total);
        }

        public Task<bool> UpdateAsync(OrderDTO entity)
        {
            throw new NotImplementedException();
        }
        public async Task<Order> CheckOut(CheckOutDTO checkOutDTO, string userId)
        {
            Order order = new Order
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                Name = checkOutDTO.Name,
                Address = checkOutDTO.Address,
                PhoneNumber = checkOutDTO.Phone,
                Description = checkOutDTO.Note,
                IsActive = "pending",
            };

            await baseRepository.AddAsync(order);//them mới đơn hàng
            foreach (var id in checkOutDTO.Id)
            {

                OrderItem orderItem = new OrderItem();
                Cart cart = await cartBaseRepository.GetByIdAsync(id);
                orderItem.Id = Guid.NewGuid().ToString();
                orderItem.OrderId = order.Id;
                orderItem.Quantity = cart.Quantity;
                orderItem.ProductId = cart.ProductId;

                var product = await productBaseRepository.GetByIdAsync(cart.ProductId);
                product.Quantity = product.Quantity - cart.Quantity;// trừ số lượng
                await cartBaseRepository.DeleteAsync(id.ToString());   //xóa giỏ hàng
                await orderItemBaseRepository.AddAsync(orderItem);//thêm vào chi tiết đơn hàng

            }
            return order;
        }


    }
}
