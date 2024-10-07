using API.Models.DTO;
using API.Models.Entity;

namespace API.Repository.Interface
{
    public interface IOrderRepository
    {
        public Task<(List<OrderDTO>, int)> ShowList(string name, int page, int size, string isActive);
    }
}
