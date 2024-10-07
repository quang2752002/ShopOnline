using API.Models.DTO;

namespace API.Repository.Interface
{
    public interface IOrderItemRepository
    {
        public Task<List<OrderItemDTO>> GetByIdOrder(string id);
    }
}
