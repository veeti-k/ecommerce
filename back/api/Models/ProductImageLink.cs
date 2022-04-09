using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class ProductImageLink
{
  [Key] public Guid ProductImageLinkId { get; set; }
  [Required] public int ProductId { get; set; }
  [Required] public string Link { get; set; }
}