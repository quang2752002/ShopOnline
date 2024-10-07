using System.Text.Json.Serialization;

namespace API.Models.Entity
{
    public class Cart:BaseEntity
    {
        public string UserId { get; set; }
        public int Quantity { get; set; }
        public string ProductId { get; set; }

        [JsonIgnore]
        public virtual Product? Product { get; set; }
        [JsonIgnore]
        public virtual User? Users { get; set; }
    }
}
