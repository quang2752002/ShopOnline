using API.Models.DTO;
using API.Models.Entity; // Đảm bảo import lớp User tùy chỉnh
using API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApiWithRoleAuthentication.Models.DTO;

namespace WebApiWithRoleAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager; // Sử dụng lớp User tùy chỉnh
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public AccountController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IUserService userService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            var user = new User // Sử dụng lớp User tùy chỉnh
            {
                UserName = model.Username,
                Email = model.Email,
                Name = model.Name // Giả sử mô hình Register có thuộc tính Name
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");
                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] Register model)
        {
            var user = new User // Sử dụng lớp User tùy chỉnh
            {
                UserName = model.Username,
                Email = model.Email,
                Name = model.Name // Giả sử mô hình Register có thuộc tính Name
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
                return Ok(new { message = "Admin registered successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpiryMinutes"]!)),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)),
                    SecurityAlgorithms.HmacSha256));

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), role = userRoles });
            }

            return Unauthorized();
        }

        [HttpPost("add-role")]
        public async Task<IActionResult> AddRole([FromBody] string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                var result = await _roleManager.CreateAsync(new IdentityRole(role));
                if (result.Succeeded)
                {
                    return Ok(new { message = "Role added successfully" });
                }

                return BadRequest(result.Errors);
            }

            return BadRequest("Role already exists");
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] UserRole model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var result = await _userManager.AddToRoleAsync(user, model.Role);
            if (result.Succeeded)
            {
                return Ok(new { message = "Role assigned successfully" });
            }

            return BadRequest(result.Errors);
        }
        [HttpGet("get-users")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsersWithRoleUser([FromQuery] string name="", [FromQuery] int page = 1, [FromQuery] int size = 10)
        {
           (List<User> users,int total)=await _userService.GetUsers(name,page, size);

            return Ok(new
            {
                users = users,  
                total = total       
            });
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update(UserDTO userDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userDto.Id);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }
                if (!string.IsNullOrEmpty(userDto.Name))
                {
                    user.Name = userDto.Name;
                }

                if (!string.IsNullOrEmpty(userDto.Email))
                {
                    user.Email = userDto.Email;
                }

                if (!string.IsNullOrEmpty(userDto.PhoneNumber))
                {
                    user.PhoneNumber = userDto.PhoneNumber;
                }

                if (userDto.Dob.HasValue)
                {
                    user.Dob = userDto.Dob;
                }

                if (!string.IsNullOrEmpty(userDto.Avatar))
                {
                    user.Avatar = userDto.Avatar;
                }


                //if (!string.IsNullOrEmpty(userDto.NewPassword))
                //{
                //    var passwordChangeResult = await _userManager.ChangePasswordAsync(user, userDto.CurrentPassword, userDto.NewPassword);
                //    if (!passwordChangeResult.Succeeded)
                //    {
                //        return BadRequest(new { message = "Password change failed", errors = passwordChangeResult.Errors });
                //    }
                //}

                // Lưu các thay đổi
                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new { message = "User updated successfully" });
                }

                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
