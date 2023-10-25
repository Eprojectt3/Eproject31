using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.UserDto
{
    public class UserDto
    {
        public int? Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Name { get; set; }
        public int? RoleId { get; set; }
    }
}
