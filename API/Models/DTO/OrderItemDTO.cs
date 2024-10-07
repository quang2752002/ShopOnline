using System.ComponentModel.DataAnnotations;

namespace API.Models.DTO
{
    public class OrderItemDTO
    {
        public string Id { get; set; }
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }

        public string? FeedBack { get; set; }

        public int? VoteStar { get; set; }

        public double? Price { get; set; }
        public string? ProductName { get; set; }
        public string Img { get; set; }

    }
}
