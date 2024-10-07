using System.ComponentModel.DataAnnotations;

namespace API.Models.Entity
{
    public class BaseEntity
    {
        [Key]
        public string Id { get; set; }
    }
}
