using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class GetProductReviews : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult<IEnumerable<ProductReviewResponse>>
{
  private readonly IProductReviewService _productReviewService;

  public GetProductReviews(IProductReviewService aProductProductReviewService)
  {
    _productReviewService = aProductProductReviewService;
  }

  [HttpGet(Routes.Products.Product.ReviewsRoot)]
  public override async Task<ActionResult<IEnumerable<ProductReviewResponse>>> HandleAsync(
    int productId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var reviews = await _productReviewService.GetProductReviews(productId);

    return Ok(reviews);
  }
}