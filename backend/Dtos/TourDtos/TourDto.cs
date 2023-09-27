using backend.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.TourDtos
{
    public class TourDto
    {
        public string? Name { get; set; }
        public double Price { get; set; }
        public string Category_Name { get; set; }
        public int quantity_limit { get; set; }
        public int Rating { get; set; } = 0;
    }
}
