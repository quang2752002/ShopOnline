using API.Models.DTO;

namespace API.Service.Interface
{
    public interface IOrderItemService
    {
        public Task<List<OrderItemDTO>> GetByIdOrder(string id);

    }
}
