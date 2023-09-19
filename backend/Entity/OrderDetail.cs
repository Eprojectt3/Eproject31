using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
  public class OrderDetail : BaseCreateDate
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [ForeignKey(nameof(Order.Id))]
    public int OrderID { get; set; }
    public Order? order { get; set; }

    public int quantity { get; set; }
    public double price { get; set; }
    public DateTime Create_Date { get; set; }
    public DateTime End_Date { get; set; }

    [ForeignKey(nameof(Tour.Id))]
    public int TourID { get; set; }
    public Tour? tour { get; set; }

    [ForeignKey(nameof(User.Id))]
    public int UserID { get; set; }
    public User? Users { get; set; }
  }
}
