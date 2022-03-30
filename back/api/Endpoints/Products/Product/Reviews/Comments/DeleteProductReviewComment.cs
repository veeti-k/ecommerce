using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReviewComment.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews.Comments;

public class DeleteProductReviewComment : EndpointBaseAsync
  .WithRequest<RemoveProductReviewCommentRequest>
  .WithActionResult
{
  private readonly IProductRepo _productRepo;
  private readonly IProductReviewRepo _productReviewRepo;
  private readonly IProductReviewCommentRepo _productReviewCommentRepo;

  public DeleteProductReviewComment(
    IProductRepo productRepo,
    IProductReviewRepo productReviewRepo,
    IProductReviewCommentRepo productReviewCommentRepo)
  {
    _productRepo = productRepo;
    _productReviewRepo = productReviewRepo;
    _productReviewCommentRepo = productReviewCommentRepo;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.Product.Reviews.Review.Comments.Comment)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var review = await _productReviewRepo.GetOneApproved(request.ProductId, request.ReviewId);
    if (review is null) throw new ProductReviewNotFoundException(request.ReviewId);

    var comment = await _productReviewCommentRepo.GetOne(request.ReviewId, request.CommentId);
    if (comment is null) throw new ProductReviewCommentNotFoundException(request.CommentId);

    await _productReviewCommentRepo.Delete(comment);

    return NoContent();
  }
}