namespace api.Mapping.MappedTypes.Product;

public class ProductQuestionResponse
{
  public Guid Id { get; init; }
  public int ProductId { get; init; }
  public string QuestionersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
}