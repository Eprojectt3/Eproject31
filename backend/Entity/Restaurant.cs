using webapi.Base;

namespace backend.Entity
{
    public class Restaurant : BaseCreateDate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Ratings { get; set; }
        public string State { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }
        public int PhoneNumbber { get; set; }
    }
}
