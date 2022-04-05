using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Models.Product.Question;
using api.Models.Product.Review;

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
  [Required] public float AverageStars { get; set; }
  [Required] public int ReviewCount { get; set; }
  [Required] public int QuestionCount { get; set; }
  [Required] public int CategoryId { get; set; }

  public virtual IEnumerable<ProductImageLink> Images { get; init; }
  public virtual IEnumerable<ProductBulletPoint> BulletPoints { get; init; }
  public virtual IEnumerable<ProductReview> Reviews { get; init; }
  public virtual IEnumerable<ProductQuestion> Questions { get; init; }
  public virtual IEnumerable<ProductsCategories> ProductsCategories { get; init; }
}