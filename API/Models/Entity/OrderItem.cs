using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models.Entity
{
    public class OrderItem : BaseEntity
    {
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string? FeedBack { get; set; }

        [Range(0, 5, ErrorMessage = "Vote star must be between 0 and 5.")]
        public int? VoteStar { get; set; }

        [JsonIgnore]
        public virtual Product? Product { get; set; }
        [JsonIgnore]
        public virtual Order? Order { get; set; }



    }
}
