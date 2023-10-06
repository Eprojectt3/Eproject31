namespace backend.Dtos.HotelDtos
{
    public class HotelDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Price_range { get; set; }
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public int? Rating { get; set; }
        public List<string> UrlImage { get; set; }
    }
}
