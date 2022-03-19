using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.ProductId.Reviews;

public class RemoveProductReview : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult
{
  private readonly IReviewService _reviewService;

  public RemoveProductReview(IReviewService reviewService)
  {
    _reviewService = reviewService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.ReviewsReview)]
  public override async Task<ActionResult> HandleAsync(
    Guid reviewId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _reviewService.RemoveReview(reviewId);

    return NoContent();
  }
}