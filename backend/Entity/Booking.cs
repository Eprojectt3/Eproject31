using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
    public class Booking:BaseCreateDate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey(nameof(Tour.Id))]
        public int? TourId { get; set; }
        public Tour? tour { get; set; }
        public DateTime? Start_Date { get; set; }
        public DateTime? End_Date { get; set; }
        public double? Range_time { get; set; }
        public int? Quantity { get; set; }
        [ForeignKey(nameof(Staff.Id))]
        public int? StaffId { get;set; }
        public Staff? staff { get; set; }
        [ForeignKey(nameof(Discount.Id))]
        public int? DiscountId { get; set;}
        public Discount? discount { get; set; }
        
        [Column(TypeName = "ntext")]
        public string? Description { get; set; }
    }
}
