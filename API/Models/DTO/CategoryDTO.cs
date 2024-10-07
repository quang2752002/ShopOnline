using API.Models.Entity;
using System.ComponentModel.DataAnnotations;

namespace API.Models.DTO
{
    public class CategoryDTO
    {
        public string? Id {  get; set; }
        public string? Name { get; set; }

        public string? Description { get; set; }
        public bool? IsActive { get; set; } = true;
       
    }
}
