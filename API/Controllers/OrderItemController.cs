using API.Repository.Interface;
using API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItemService orderItemService;

        public OrderItemController(IOrderItemService orderItemService)
        {
            this.orderItemService = orderItemService;
        }

        [HttpGet("get-orderItem/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByIdOrder(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id)) 
                { 
                    return NotFound();
                }
                var query= await orderItemService.GetByIdOrder(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }

    }
}
