namespace api.Mapping.MappedTypes.Product;

public record ProductQuestionAnswerResponse
{
  public Guid Id { get; init; }
  public Guid QuestionId { get; init; }
  public string AnswerersNickname { get; init; }
  public bool ByEmployee { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
  public bool IsApproved { get; init; }
}