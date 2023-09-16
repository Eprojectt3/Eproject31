using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    public class Resorts
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public int Rating { get; set; }
        public int? ImageDetail { get; set; }
        public string? Description { get; set; }
        public string? Avatar { get; set; }
        public double Price { get; set; }
        public int PhoneNumber { get; set; }
        public bool? IsActive { get; set; } = true;

        [ForeignKey(nameof(Location1.ID))]
        public int LocationId { get; set; }
        public Location1? Location { get; set; }

        public string? link { get; set; }
    }
}
