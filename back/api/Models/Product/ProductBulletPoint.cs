using System.ComponentModel.DataAnnotations;

namespace api.Models.Product;

public class ProductBulletPoint
{
  [Key] [Required] public Guid BulletPointId { get; set; }
  [Required] public int ProductId { get; set; }
  [Required] public string Text { get; set; }
}