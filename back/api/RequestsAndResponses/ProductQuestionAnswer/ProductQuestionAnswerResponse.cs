namespace api.RequestsAndResponses.ProductQuestionAnswer;

public class ProductQuestionAnswerResponse
{
  public Guid Id { get; init; }
  public Guid QuestionId { get; init; }
  public string AnswerersNickname { get; init; }
  public bool ByEmployee { get; init; }
  public string Content { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
}