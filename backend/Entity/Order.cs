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
    public double Price { get; set; }

    public enum Status
    {
      Cancel,
      Success
    }

    public int number_people { get; set; }
    public ICollection<OrderDetail> OrderDetails { get; set; }
  }
}
