using System.ComponentModel.DataAnnotations;

namespace api.Models.Question;

public class ProductQuestion
{
  [Key] public Guid ProductQuestionId { get; init; }
  [Required] public int ProductId { get; init; }
  [Required] public string QuestionersNickname { get; init; }
  [Required] public string Title { get; init; }
  [Required] public string Content { get; init; }
  [Required] public DateTimeOffset CreatedAt { get; init; }
  [Required] public bool IsApproved { get; set; }

  public virtual List<ProductQuestionAnswer> Answers { get; init; }
}