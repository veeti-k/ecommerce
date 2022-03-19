using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class RemoveProductReview : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult
{
  private readonly IProductReviewService _productReviewService;

  public RemoveProductReview(IProductReviewService aProductProductReviewService)
  {
    _productReviewService = aProductProductReviewService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.ReviewsReview)]
  public override async Task<ActionResult> HandleAsync(
    Guid reviewId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productReviewService.RemoveReview(reviewId);

    return NoContent();
  }
}