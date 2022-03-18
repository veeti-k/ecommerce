using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models.Product;

public class Product
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; init; }

  [Required] public string Name { get; set; }
  [Required] public string Description { get; set; }
  [Required] public double Price { get; set; }
  [Required] public double DiscountedPrice { get; set; }
  [Required] public float DiscountPercent { get; set; }
  [Required] public double DiscountAmount { get; set; }
  [Required] public bool IsDiscounted { get; set; }
  [Required] public bool IsDeleted { get; set; }

  public virtual IEnumerable<ProductSpecification> Specifications { get; init; }
  public virtual IEnumerable<ProductReview> Reviews { get; init; }
  public virtual IEnumerable<ProductQuestion> Questions { get; init; }
}