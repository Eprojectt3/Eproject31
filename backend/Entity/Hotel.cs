namespace backend.Entity
{
    public class Hotel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int Rate { get; set; }
        public int LocatinId { get; set; }

        public string? Description { get; set; }
        public int ImageDetail { get; set; }
        public string? Address { get; set; }
        public string? Image { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string? CreateBy { get; set; }
        public string? UpdateBy { get; set; }
        public int PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
