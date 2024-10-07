using System.Text.Json.Serialization;

namespace API.Models.Entity
{
    public class Order : BaseEntity
    {
        public string? UserId { get; set; }
        public DateTime? OrderDate { get; set; } = DateTime.Now;
        public string? PaymentMethod { get; set; } = "";
        public string IsActive { get; set; } = "";
        public string? Name { get; set; } = "";
        public string? Description { get; set; } = "";
        public string? Address { get; set; } = "";
        public string? PhoneNumber { get; set; } = "";

        [JsonIgnore]
        public virtual User? User { get; set; }

       
        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}
