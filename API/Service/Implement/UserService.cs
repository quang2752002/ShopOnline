using API.Models.DTO;
using API.Models.Entity;
using API.Service.Interface;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace API.Service.Implement
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }



        public async Task<(List<User> users, int total)> GetUsers(string name, int page, int size)
        {
            var usersInRole = await _userManager.GetUsersInRoleAsync("User");

            if (!string.IsNullOrEmpty(name))
            {
                usersInRole = usersInRole
                    .Where(user => user.Name != null && user.Name.Contains(name, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            var orderedUsers = usersInRole.OrderBy(user => user.Name).ToList();

            var totalUsers = orderedUsers.Count;

            var paginatedUsers = orderedUsers
                .Skip((page - 1) * size)
                .Take(size)
                .Select(user => new User
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Name = user.Name,
                    Dob = user.Dob,
                    Avatar = user.Avatar,
                    PhoneNumber=user.PhoneNumber,

                })
                .ToList();

            return (paginatedUsers, totalUsers);
        }

    }
}
