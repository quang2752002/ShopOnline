using API.Models.DTO;

namespace API.Repository.Interface
{
    public interface ICartRepository
    {
        public  Task<(List<CartDTO>,int)> getCart(string userId,int page);

    }
}
