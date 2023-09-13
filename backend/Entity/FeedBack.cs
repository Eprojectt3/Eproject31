using webapi.Base;

namespace backend.Entity
{
    public class FeedBack : BaseCreateDate
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public int? Phone { get; set; }
    }
}
