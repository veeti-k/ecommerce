using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Models.Question;
using api.Models.Review;

namespace api.Models;

public class Product
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int ProductId { get; init; }

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
  [Required] public int DeepestCategoryId { get; set; }

  public virtual List<ProductImageLink> Images { get; init; }
  public virtual List<ProductBulletPoint> BulletPoints { get; init; }
  public virtual List<ProductReview> Reviews { get; init; }
  public virtual List<ProductQuestion> Questions { get; init; }
  public virtual List<ProductsCategories> ProductsCategories { get; init; }
}