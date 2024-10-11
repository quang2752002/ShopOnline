using API.Models.DTO;
using API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Abstractions;
using WebApiWithRoleAuthentication.Service.Implement;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }


        [HttpGet("get-category")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShowList([FromQuery] string name = "", [FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            try
            {
                var (categories, total) = await categoryService.GetAllAsync(name, page, size);

                return Ok(new
                {
                    categories = categories,
                    total = total
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create-category")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CategoryDTO categoryDTO)
        {
            try
            {
                if (categoryDTO.Name == null || categoryDTO.Name == "")
                {
                    return BadRequest();
                }
                var query = await categoryService.AddAsync(categoryDTO);
                if (!query)
                    return BadRequest();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("update")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(CategoryDTO categoryDTO)
        {
            try
            {
                if (categoryDTO.Name == null || categoryDTO.Name == "")
                {
                    return BadRequest();
                }
                var query = await categoryService.UpdateAsync(categoryDTO);
                if (!query)
                    return BadRequest();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-category/{id}")]
       
        public async Task<IActionResult> getCategory(string id)
        {
            try
            {
                if (id == null || id == "")
                {
                    return BadRequest();
                }
                var query = await categoryService.GetByIdAsync(id);
                if (query == null)
                    return NotFound();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                if (id == null || id == "")
                {
                    return BadRequest();
                }
                var query = await categoryService.DeleteAsync(id);
                if (!query)
                    return BadRequest();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-list")]
        public async Task<IActionResult> getList()
        {
            try
            {
                
                var query =await  categoryService.getListAsync();
                return Ok(query);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
