using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class RemoveProductReviewComment : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult
{
  private readonly IProductReviewService _productReviewService;

  public RemoveProductReviewComment(IProductReviewService aProductProductReviewService)
  {
    _productReviewService = aProductProductReviewService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.ReviewCommentsComment)]
  public override async Task<ActionResult> HandleAsync(
    Guid commentId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productReviewService.RemoveComment(commentId);

    return NoContent();
  }
}