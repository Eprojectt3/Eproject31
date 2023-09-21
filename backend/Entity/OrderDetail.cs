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
        public int? OrderID { get; set; }
        public Order? order { get; set; }

        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public int? Rating { get; set; } = 0;

        [ForeignKey(nameof(User.Id))]
        public int? UserID { get; set; }
        public User? Users { get; set; }
        public string? Description { get; set; }
        public string? Type_Payment { get; set; } //VNPAY PAYPAL
        public string? Payment_Id { get; set; }
    }



}
