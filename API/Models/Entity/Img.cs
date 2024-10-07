using System.Text.Json.Serialization;

namespace API.Models.Entity
{
    public class Img:BaseEntity
    {
        public string Url { get; set; }
        public bool IsActive { get; set; } = true;
        public string? ProductId { get; set; }

        [JsonIgnore]
        public virtual Product? Product { get; set; }

    }
}
