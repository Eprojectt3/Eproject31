using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
  public class Discount : BaseCreateDate
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Discount1 { get; set; }
    public DateTime Start_Date { get; set; }
    public DateTime End_Date { get; set; }
    public string? Description { get; set; }
  }
}
