using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Interface;
using API.Service.Interface;

namespace API.Service.Implement
{
    public class OrderItemService : IOrderItemService
    {
        private readonly IOrderItemRepository orderItemRepository;
        private readonly IBaseRepository<OrderItem> baseRepository;

        public OrderItemService(IOrderItemRepository orderRepository, IBaseRepository<OrderItem> baseRepository)
        {
            this.orderItemRepository = orderRepository;
            this.baseRepository = baseRepository;
        }

        public async Task<List<OrderItemDTO>> GetByIdOrder(string id)
        {
            return await orderItemRepository.GetByIdOrder(id);         
        }
    }
}
