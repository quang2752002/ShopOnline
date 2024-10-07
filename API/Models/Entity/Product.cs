using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Text.Json.Serialization;

namespace API.Models.Entity
{
    public class Product : BaseEntity
    {
        public string? CategoryId { get; set; }
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string? Name { get; set; }

        [StringLength(300, MinimumLength = 1, ErrorMessage = "")]
        public string? Description { get; set; }
        public double? Price { get; set; }
       

        public int? Quantity { get; set; } = 0;

        public bool? IsActive { get; set; } = true;

        //nav
        [JsonIgnore]
        public virtual Category? Category { get; set; }
        [JsonIgnore]
        public virtual ICollection<Img>? Imgs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Cart>? Carts { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}
