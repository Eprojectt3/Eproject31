namespace backend.Entity
{
    public class Service
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int TourID { get; set; }
        public Tour? Tour { get; set; }
    }
}
