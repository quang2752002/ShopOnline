using API.Models.DTO;
using API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IUserService _userService;

        public CartController(ICartService cartService, IUserService userService)
        {
            _cartService = cartService;
            _userService = userService;
        }

        [HttpGet("GetCart")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetCart([FromQuery] int page = 1)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.Sid)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                (List<CartDTO> carts, int total) = await _cartService.getCart(userId, page);

                return Ok(new
                {
                    carts = carts,
                    total = total,
                });


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("AddOrUpdate")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddOrUpdateCart(string productId, int quantity)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.Sid)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }
                var query = await _cartService.AddOrUpdateCart(userId, productId, quantity);
                if (!query)
                    return BadRequest();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
