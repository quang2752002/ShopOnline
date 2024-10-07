using System.ComponentModel.DataAnnotations;

namespace WebApiWithRoleAuthentication.Models.DTO
{
    public class ProductDTO
    {
        public string? Id { set; get; }
        public string? CategoryId { get; set; }
        public string? Name { get; set; }

        public string? Description { get; set; }
        public double Price { get; set; }


        public int Quantity { get; set; } = 0;

        public bool IsActive { get; set; } = true;
        public string? Img { set; get; }

        public string? CategoryName { set; get; }
        public int? QuantitySold { set; get; }
    }
}
