using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReviewComment.Add;

public class AddProductReviewCommentRequestBody
{
  public string CommentersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}

public class AddProductReviewCommentRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
  [FromBody] public AddProductReviewCommentRequestBody Body { get; set; }
}

public class AddProductReviewCommentRequestValidator : AbstractValidator<AddProductReviewCommentRequest>
{
  public AddProductReviewCommentRequestValidator()
  {
    RuleFor(x => x.Body).NotNull();
    RuleFor(x => x.Body.CommentersNickname).NotEmpty();
    RuleFor(x => x.Body.Title).NotEmpty();
    RuleFor(x => x.Body.Content).NotEmpty();
  }
}