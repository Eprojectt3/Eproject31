using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
  public class Service : BaseCreateDate
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }
    public string? Name { get; set; }

    [Column(TypeName = "ntext")]
    public string? Description { get; set; }

    [ForeignKey(nameof(Booking.Id))]
    public int? BookingId { get; set; }
    public Booking? book { get; set; }
  }
}
