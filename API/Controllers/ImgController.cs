using API.Models.DTO;
using API.Models.Entity;
using API.Service.Interface;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImgController : ControllerBase
    {
        private readonly IImgService imgService;

        public ImgController(IImgService imgService)
        {
            this.imgService = imgService;
        }

       


        [HttpPost("add-img")]
        public async Task<IActionResult> Post([FromForm] ImgDTO value)
        {
            try
            {
                var query = await imgService.AddAsync(value);
                if (query == false)
                    return BadRequest("Failed");
                return Ok("Sucess");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-img/{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("delete-img/{id}")]
        public void Delete(string id)
        {

        }

        [HttpGet("get-productImg/{productId}")]
        public async Task<IActionResult> GetImgByProductId(string productId)
        {
            try
            {
                var query = await imgService.GetImgByProductId(productId);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }



    }
}
