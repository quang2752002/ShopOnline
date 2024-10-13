using API.Models.Entity;

namespace API.Models.DTO
{
    public class CartDTO
    {
        public string? Id { get; set; }
        public string? UserId { get; set; }
        public int? Quantity { get; set; }
        public string? ProductId { get; set; }

        public string? ProductName { get; set; }
        public int? ProductQuantity { get; set; }
        public double? Price { get; set; }
        public string? Description { get; set; }

        public string? Img { get; set; }

    }
}
