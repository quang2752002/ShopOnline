using API.Models.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiWithRoleAuthentication.Models.DTO;
using WebApiWithRoleAuthentication.Service.Interface;

namespace WebApiWithRoleAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }


        [HttpGet("get-product")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShowList([FromQuery] string name="",  [FromQuery] int page = 1, [FromQuery] int size = 10, [FromQuery] string categoryId = "")
        {
            try
            {
                var (products, total) = await productService.GetAllAsync(name, categoryId, page, size);
                return Ok(new
                {
                    products = products,
                    total = total,
                });
            }
            catch(Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
        [HttpPost("create-product")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(ProductDTO productDTO)
        {
            try
            {
                if (productDTO == null)
                {
                    return BadRequest();

                }
                var query = await productService.AddAsync(productDTO);
                if (!query)
                    return BadRequest();
                return Ok();
               
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
        [HttpPatch("update-product")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(ProductDTO productDTO)
        {
            try
            {
                if (productDTO == null)
                {
                    return BadRequest();

                }
                var query = await productService.UpdateAsync(productDTO);
                if (!query)
                    return BadRequest();
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("get-product/{id}")]
        public async Task<IActionResult> getProduct(string id)
        {
            try
            {
                if (id == null || id == "")
                {
                    return BadRequest();
                }
                var query = await productService.GetByIdAsync(id);
                if (query == null)
                    return NotFound();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
        [HttpDelete("delete/{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                if (id == null || id == "")
                {
                    return BadRequest();
                }
                var query = await productService.DeleteAsync(id);
                if (!query)
                    return NotFound();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("get-best-sale")]
        public async Task<IActionResult> GetBestSale([FromQuery] string name = "", [FromQuery] int page = 1, [FromQuery] int size = 9)// trang chu
        {
            try
            {
                var query= await productService.GetBestSale(name, page, size);
                return Ok(query);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-list")]//danh sach san pham
        public async Task<IActionResult> GetList([FromQuery] string name = "",[FromQuery] string categoryId = "", 
            [FromQuery] string sorting="", [FromQuery] int page = 1, [FromQuery] int size = 9)
        {
            try
            {
                (List<ProductDTO> products,int total) = await productService.GetList(name,categoryId,sorting, page, size);
                return Ok(new
                {
                    products = products,
                    total = total,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
