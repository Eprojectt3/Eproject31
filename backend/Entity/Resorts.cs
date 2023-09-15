using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
    public class Resorts : BaseCreateDate
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public int? Rating { get; set; }
        public string? ImageDetail { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public double Price { get; set; }
        public string Price_range { get; set; }
        public int PhoneNumber { get; set; }

        [ForeignKey(nameof(Location1.ID))]
        public int LocationId { get; set; }
        public Location1? Location { get; set; }
        public string? Links { get; set; }
    }
}
