using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Entity
{
    public class Staff
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public int? Phone { get; set; }
        public string? Email { get; set; }
        public string? PersonId { get; set; }
    }
}
