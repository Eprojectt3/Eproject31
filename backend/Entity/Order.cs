using webapi.Base;

namespace backend.Entity
{
    public class Order : BaseCreateDate
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public double Price { get; set; }
        public enum Status { Cancel,Success } 
        public int number_people { get; set; }
    }
}
