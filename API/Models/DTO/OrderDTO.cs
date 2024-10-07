using System.ComponentModel.DataAnnotations;

namespace API.Models.DTO
{
    public class OrderDTO
    {
        public string? Id { get; set; }

     
        public string? UserId { get; set; }

        public string? FullName { set; get; }

        public DateTime? OrderDate { get; set; }

        public string? PaymentMethod { get; set; }

        public string? IsActive { get; set; } 
   
        public string? Name { get; set; }

        public string? Description { get; set; }

       
        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }

        public double? Total { get; set; } 
    }
}
