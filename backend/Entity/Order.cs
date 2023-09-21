using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
    public class Order : BaseCreateDate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public double? Price { get; set; }
        public int? Number_people { get; set; }
        public DateTime Create_Date { get; set; }
        public DateTime End_Date { get; set; }
        [ForeignKey(nameof(TourDetail.Id))]
        public int TourDetailID { get; set; }
        public TourDetail? tourDetail { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }
    }
}
