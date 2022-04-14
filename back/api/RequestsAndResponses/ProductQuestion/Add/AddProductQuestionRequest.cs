using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestion.Add;

public record AddProductQuestionRequestBody
{
  public string QuestionersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}

public class AddProductQuestionRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public AddProductQuestionRequestBody Body { get; set; }
}

public class AddProductQuestionRequestValidator : AbstractValidator<AddProductQuestionRequest>
{
  public AddProductQuestionRequestValidator()
  {
    RuleFor(x => x.Body.QuestionersNickname).NotEmpty();
    RuleFor(x => x.Body.Title).NotEmpty();
    RuleFor(x => x.Body.Content).NotEmpty();
  }
}