using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestionAnswer.Add;

public record AddProductQuestionAnswerDto
{
  public string AnswerersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}

public class CreateProductQuestionAnswerRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
  [FromBody] public AddProductQuestionAnswerDto Dto { get; set; }
}