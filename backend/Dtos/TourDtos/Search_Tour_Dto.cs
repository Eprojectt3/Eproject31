namespace backend.Dtos.TourDtos
{
    public class Search_Tour_Dto
    {
        public string? Name { get; set; }
        public int? category_Id { get; set; }
        public string? Price { get; set; }
        public DateTime? Departure_Time { get; set; }
        public int? Rating { get; set; }
    }
}
