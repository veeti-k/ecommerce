using System.ComponentModel.DataAnnotations;

namespace api.Models.Product;

public class ProductBulletPoint
{
  [Key] public Guid Id { get; set; }
  [Required] public int ProductId { get; set; }
  [Required] public string Text { get; set; }
  [Required] public bool IsImportant { get; set; }
}