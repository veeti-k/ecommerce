using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReview.Add;

public record AddProductReviewRequestBody
{
  public string ReviewersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public int Stars { get; set; }
}

public class AddProductReviewRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public AddProductReviewRequestBody Body { get; set; }
}

public class AddProductReviewRequestValidator : AbstractValidator<AddProductReviewRequest>
{
  public AddProductReviewRequestValidator()
  {
    RuleFor(x => x.Body).NotNull();
    RuleFor(x => x.Body.ReviewersNickname).NotEmpty();
    RuleFor(x => x.Body.Title).NotEmpty();
    RuleFor(x => x.Body.Content).NotEmpty();
    RuleFor(x => x.Body.Stars).NotEmpty();
  }
}