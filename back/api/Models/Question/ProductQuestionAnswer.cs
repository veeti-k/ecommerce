using System.ComponentModel.DataAnnotations;

namespace api.Models.Question;

public class ProductQuestionAnswer
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid QuestionId { get; init; }
  [Required] public string AnswerersNickname { get; init; }
  [Required] public bool ByEmployee { get; init; }
  [Required] public string Title { get; init; }
  [Required] public string Content { get; init; }
  [Required] public bool IsApproved { get; set; }

  [Required] public DateTimeOffset CreatedAt { get; init; }
}