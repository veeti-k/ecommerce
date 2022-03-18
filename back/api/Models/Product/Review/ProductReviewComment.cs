using System.ComponentModel.DataAnnotations;

namespace api.Models.Product;

public class ProductReviewComment
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid ReviewId { get; init; }
  [Required] public string CommentersNickname { get; init; }
  [Required] public bool ByEmployee { get; init; }
  [Required] public string Title { get; init; }
  [Required] public string Content { get; init; }
  [Required] public DateTimeOffset CreatedAt { get; init; }
  [Required] public bool IsDeleted { get; init; }
}