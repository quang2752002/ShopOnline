namespace WebApiWithRoleAuthentication.Models.DTO
{
    public class Register
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name { get; set; } // Thuộc tính cho tên người dùng

    }
}
