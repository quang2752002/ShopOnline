using API.Models.DTO;
using API.Models.Entity;

namespace API.Service.Interface
{
    public interface IUserService
    {
        public Task<(List<User> users,int total)> GetUsers(string name,int page,int size);

    }
}
