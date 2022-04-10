using api.RequestsAndResponses.ProductQuestionAnswer;

namespace api.RequestsAndResponses.ProductQuestion;

public class ProductQuestionResponse
{
  public Guid Id { get; init; }
  public int ProductId { get; init; }
  public string QuestionersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
  public List<ProductQuestionAnswerResponse> Answers { get; init; }
}