namespace api.DTOs.Product;

public record CreateProductQuestionAnswerDTO
{
  public string AnswerersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}