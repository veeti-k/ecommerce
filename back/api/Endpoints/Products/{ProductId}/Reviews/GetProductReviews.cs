using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.ProductId.Reviews;

public class GetProductReviews : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult<IEnumerable<ProductReviewResponse>>
{
  private readonly IReviewService _reviewService;

  public GetProductReviews(IReviewService aReviewService)
  {
    _reviewService = aReviewService;
  }

  [HttpGet(Routes.Products.Reviews)]
  public override async Task<ActionResult<IEnumerable<ProductReviewResponse>>> HandleAsync(
    int productId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var reviews = await _reviewService.GetProductReviews(productId);

    return Ok(reviews);
  }
}