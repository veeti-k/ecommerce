namespace api.Mapping.MappedTypes.Product;

public class ProductQuestionResponse
{
  public Guid Id { get; init; }
  public int ProductId { get; init; }
  public string QuestionersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
  public bool IsApproved { get; init; }
  public IEnumerable<ProductQuestionAnswerResponse> Answers { get; init; }
}