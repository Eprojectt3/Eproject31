using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
  public class Tour : BaseCreateDate
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string? Name { get; set; }
    public double Price { get; set; }
    public int category_id { get; set; }
    [ForeignKey("category_id")]
    public Category? category { get; set; }
    public string? Description { get; set; }
    public string? image { get; set; }
    public int quantity_limit { get; set; }
    public int Rating { get; set; } = 0;
    //Xác định tour theo yêu cầu hay tour theo lộ trình
    public bool? Type { get; set; } = false;

    [ForeignKey(nameof(Transportation.Id))]
    public int Transportation_ID { get; set; }
    public Transportation? transportation { get; set; }

    public ICollection<OrderDetail>? OrderDetails { get; set; }
       public ICollection<Itinerary>? Itineraries { get; set; }
  }
}
