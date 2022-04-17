using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestionAnswer.Add;

public record AddProductQuestionAnswerRequestBody
{
  public string AnswerersNickname { get; init; }
  public string Content { get; init; }
}

public class AddProductQuestionAnswerRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
  [FromBody] public AddProductQuestionAnswerRequestBody Body { get; set; }
}

public class AddProductQuestionAnswerRequestValidator : AbstractValidator<AddProductQuestionAnswerRequest>
{
  public AddProductQuestionAnswerRequestValidator()
  {
    RuleFor(r => r.Body).NotNull();
    RuleFor(r => r.Body.AnswerersNickname).NotEmpty();
    RuleFor(r => r.Body.Content).NotEmpty();
  }
}