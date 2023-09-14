using AutoMapper.Configuration.Conventions;
using Microsoft.CodeAnalysis;
using webapi.Base;

namespace backend.Entity
{
    public class Itinerary: BaseCreateDate
    {
        public int Id { get; set; }
        public int TourID { get; set; }
        public Tour? tour { get; set; }
        // Thứ tự lịch trình trong tour
        public int Sequence { get; set; } 
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int LocationID { get; set; }
        public Location1? Location { get; set; }
    }
}
