using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class StoreProduct
{
  [Required] public Guid StoreId { get; set; }
  [Required] public int ProductId { get; set; }
  [Required] public int Quantity { get; set; }
}