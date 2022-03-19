namespace api.DTOs.Product;

public record CreateProductQuestionDTO
{
  public string QuestionersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}