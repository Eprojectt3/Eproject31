using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
  public class Hotel : BaseCreateDate
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string? Name { get; set; }
    //public double Price { get; set; }
    public string? Price_range { get; set; }
    public int? Rating { get; set; }

    [ForeignKey(nameof(Location1.ID))]
    public int? LocatinId { get; set; }
    public Location1? location1 { get; set; }

    [Column(TypeName = "ntext")]
    public string? Description { get; set; }
    public string? ImageDetail { get; set; }
    public string? Address { get; set; }
    public string? Image { get; set; }
    public int? PhoneNumber { get; set; }
    public string? Links { get; set; }
        //public ICollection<Itinerary>? Itineraries { get; set; }
  }
}
