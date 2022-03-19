using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.ProductId.Reviews.ReviewId.Comments.CommentId;

public class RemoveProductReviewComment : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult
{
  private readonly IReviewService _reviewService;

  public RemoveProductReviewComment(IReviewService aReviewService)
  {
    _reviewService = aReviewService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.ReviewCommentsComment)]
  public override async Task<ActionResult> HandleAsync(
    Guid commentId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _reviewService.RemoveComment(commentId);

    return NoContent();
  }
}