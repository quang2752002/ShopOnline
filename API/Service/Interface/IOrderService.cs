using API.Models.DTO;
using API.Models.Entity;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Service.Interface
{
    public interface IOrderService
    {
        public Task<(List<OrderDTO> ,int)> ShowList(string name,int page, int size,string isActive);
        public Task<bool> ChangeIsActive(string id,string isActive);
        public Task<bool> AddAsync(OrderDTO entity);
        public Task<bool> UpdateAsync(OrderDTO entity);
        public  Task<Order> CheckOut(CheckOutDTO checkOutDTO, string userId);
    }
}
