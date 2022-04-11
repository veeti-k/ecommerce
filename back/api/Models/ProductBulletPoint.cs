using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class ProductBulletPoint
{
  [Key] public Guid ProductBulletPointId { get; set; }
  [Required] public int ProductId { get; set; }
  [Required] public string Text { get; set; }
}