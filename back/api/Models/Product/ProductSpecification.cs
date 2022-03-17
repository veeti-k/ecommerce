using System.ComponentModel.DataAnnotations;

namespace api.Models.Product;

public class ProductSpecification
{
  [Key] public Guid Id { get; init; }
  [Required] public int ProductId { get; init; }
  [Required] public string Text { get; init; }
  [Required] public bool IsImportant { get; init; }
}