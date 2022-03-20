using api.Mapping.MappedTypes.Product;
using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews.Comments;

public class ApproveProductReviewCommentRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
  [FromRoute(Name = "commentId")] public Guid CommentId { get; set; }
}

public class ApproveProductReviewComment : EndpointBaseAsync
  .WithRequest<ApproveProductReviewCommentRequest>
  .WithActionResult<ProductReviewCommentResponse>
{
  private readonly IProductReviewCommentService _productReviewCommentService;

  public ApproveProductReviewComment(IProductReviewCommentService aProductReviewCommentService)
  {
    _productReviewCommentService = aProductReviewCommentService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpPatch(Routes.Products.Product.Reviews.Review.Comments.Comment)]
  public override async Task<ActionResult<ProductReviewCommentResponse>> HandleAsync(
    [FromRoute] ApproveProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var updated =
      await _productReviewCommentService.ApproveComment(request.ProductId, request.ReviewId, request.CommentId);

    return Ok(updated);
  }
}