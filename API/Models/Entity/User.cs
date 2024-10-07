using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace API.Models.Entity
{
    public class User : IdentityUser
    {
       
      
        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string? Name { get; set; }
        public DateTime? Dob { get; set; }
        
        [StringLength(10, MinimumLength = 1)]
        public string? Sex { get; set; }
        public string? Avatar { get; set; }
        public bool? IsActive { get; set; } = true;
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        [JsonIgnore]
        public virtual ICollection<Cart>? Carts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Order>? Orders { get; set; }
       


    }

}

