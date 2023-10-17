using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Base;

namespace backend.Entity
{
    public class Location1 : BaseCreateDate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string? State { get; set; }
        public ICollection<Place>? Hotels { get; set; }

    }
}
