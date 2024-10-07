namespace API.Models.DTO
{
    public class UserDTO
    {
        public string Id { get; set; } 
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? Dob { get; set; }
        public string? Avatar { get; set; }

        public string UserName { get; set; }
        public string? CurrentPassword { get; set; }  // Mật khẩu hiện tại
        public string? NewPassword { get; set; }      // Mật khẩu mới
    }
}
