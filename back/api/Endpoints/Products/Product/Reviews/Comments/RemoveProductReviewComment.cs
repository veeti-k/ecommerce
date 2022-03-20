using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews.Comments;

public class RemoveProductReviewCommentRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
  [FromRoute(Name = "commentId")] public Guid CommentId { get; set; }
}

public class RemoveProductReviewComment : EndpointBaseAsync
  .WithRequest<RemoveProductReviewCommentRequest>
  .WithActionResult
{
  private readonly IProductReviewCommentService _productReviewCommentService;

  public RemoveProductReviewComment(IProductReviewCommentService aProductProductReviewCommentService)
  {
    _productReviewCommentService = aProductProductReviewCommentService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.Product.Reviews.Review.Comments.Comment)]
  public override async Task<ActionResult> HandleAsync(
    RemoveProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productReviewCommentService.RemoveComment(request.ProductId, request.ReviewId, request.CommentId);

    return NoContent();
  }
}