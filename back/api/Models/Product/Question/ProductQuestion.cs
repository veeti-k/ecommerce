using System.ComponentModel.DataAnnotations;

namespace api.Models.Product;

public class ProductQuestion
{
  [Key] public Guid Id { get; init; }
  [Required] public int ProductId { get; init; }
  [Required] public string QuestionersNickname { get; init; }
  [Required] public string Title { get; init; }
  [Required] public string Content { get; init; }
  [Required] public DateTimeOffset CreatedAt { get; init; }

  public virtual IEnumerable<ProductQuestionAnswer> Answers { get; init; }
}