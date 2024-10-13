using API.Models.DTO;
using API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
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

        [HttpGet("get-cart")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetCart()
        {
            try
            {
                var userId = User.FindFirst(JwtRegisteredClaimNames.Sid)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }
                var carts = await _cartService.getCart(userId);

                return Ok(carts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("add-cart")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddCart([FromBody] CartDTO cartDTO)
        {
            try
            {
                var userId = User.FindFirst(JwtRegisteredClaimNames.Sid)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }
                var query = await _cartService.AddCart(userId, cartDTO.ProductId, cartDTO.Quantity.Value);
                if (!query)
                    return BadRequest();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPatch("update-cart")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateQuantityCart([FromBody] CartDTO cartDTO)
        {
            try
            {
                if (string.IsNullOrEmpty(cartDTO.ProductId) || cartDTO.Quantity == 0)
                {
                    return BadRequest();
                }
                var userId = User.FindFirst(JwtRegisteredClaimNames.Sid)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }
                var isChecked = await _cartService.UpdateCart(userId, cartDTO.ProductId, cartDTO.Quantity.Value);
                if (isChecked)
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-cart-checkout")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetCartCheckOut([FromQuery] string[] id)
        {
            try
            {
                var userId = User.FindFirst(JwtRegisteredClaimNames.Sid)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var carts = await _cartService.getCartCheckOut(id);

                return Ok(carts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
