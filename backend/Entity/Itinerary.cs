using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper.Configuration.Conventions;
using Microsoft.CodeAnalysis;
using webapi.Base;

namespace backend.Entity
{
    public class Itinerary : BaseCreateDate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? TourID { get; set; }
        [ForeignKey("TourID")]
        public Tour? tour { get; set; }

        // Thứ tự lịch trình trong tour
        public int? Sequence { get; set; }
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public string? Type { get; set; }

        public int PlaceID { get; set; } = 1;
        [ForeignKey("PlaceID")]
        public Place? hotel { get; set; }
    }
}
