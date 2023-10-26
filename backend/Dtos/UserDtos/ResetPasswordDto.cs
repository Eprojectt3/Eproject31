using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.ResetPasswordDto
{
    public class ResetPasswordDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
