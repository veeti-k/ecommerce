using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestion.Add;

public record CreateProductQuestionDto
{
  public string QuestionersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}

public class CreateProductQuestionRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public CreateProductQuestionDto Dto { get; set; }
}