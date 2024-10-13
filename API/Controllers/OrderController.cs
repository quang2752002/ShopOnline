using API.Models.DTO;
using API.Models.Entity;
using API.Service.Implement;
using API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IVNPayService vnPayService;

        public OrderController(IOrderService orderService, IVNPayService vnPayService)
        {
            this.orderService = orderService;
            this.vnPayService = vnPayService;
        }

        [HttpGet("get-order")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShowList([FromQuery] string name="",[FromQuery] int page = 1, [FromQuery] int size = 10, [FromQuery] string isActive = "pending")
        {
            try
            {
                var (orders, total) = await orderService.ShowList(name, page, size,isActive);

                return Ok(new
                {
                    orders = orders,
                    total = total
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> Create(OrderDTO orderDTO)
        {
            try
            {
                if (orderDTO == null)
                {
                    return BadRequest("OrderDTO is null."); 
                }

                if (string.IsNullOrEmpty(orderDTO.Name))
                {
                    return BadRequest("Name is required.");
                }

                var query = await orderService.AddAsync(orderDTO);

                if (!query)
                {
                    return StatusCode(500, "Failed to create order.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPatch("change-active")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeActive([FromQuery] string id, [FromQuery] string isActive)
        {
            try
            {
              
                if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(isActive))
                {
                    return BadRequest("Id or isActive cannot be null or empty");
                }             
                var query = await orderService.ChangeIsActive(id, isActive);

                if (!query)
                    
                    return BadRequest("Failed to update the active status.");

                return Ok(new { message = "Active status updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
        [HttpPost("check-out")]
        [Authorize(Roles ="User")]
        public async Task<IActionResult> CheckOut([FromBody] CheckOutDTO checkOutDTO)
        {
            try
            {
                if (checkOutDTO == null)
                {
                    return BadRequest("Invalid checkout data.");
                }
                var userId = User.FindFirst(JwtRegisteredClaimNames.Sid)?.Value;
                

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }
                var order = await orderService.CheckOut(checkOutDTO, userId);
                var urlPayment = vnPayService.GetUrlPayment(1, order);
                if (urlPayment == null)
                    return BadRequest();
                return Ok(urlPayment);

            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
