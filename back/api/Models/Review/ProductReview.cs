using System.ComponentModel.DataAnnotations;

namespace api.Models.Review;

public class ProductReview
{
  [Key] public Guid Id { get; init; }
  [Required] public int ProductId { get; init; }
  [Required] public string ReviewersNickname { get; init; }
  [Required] public bool ByEmployee { get; init; }
  [Required] public string Title { get; init; }
  [Required] public string Content { get; init; }
  [Required] public int Stars { get; init; }
  [Required] public DateTimeOffset CreatedAt { get; init; }
  [Required] public bool IsApproved { get; set; }

  public virtual IEnumerable<ProductReviewComment> Comments { get; init; }
}