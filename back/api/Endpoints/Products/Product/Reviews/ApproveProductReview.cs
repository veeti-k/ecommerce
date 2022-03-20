using api.Mapping.MappedTypes.Product;
using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class ApproveProductReviewRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
}

public class ApproveProductReview : EndpointBaseAsync
  .WithRequest<ApproveProductReviewRequest>
  .WithActionResult<ProductReviewResponse>
{
  private readonly IProductReviewService _productReviewService;

  public ApproveProductReview(IProductReviewService aProductReviewService)
  {
    _productReviewService = aProductReviewService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpPatch(Routes.Products.Product.Reviews.ReviewRoot)]
  public override async Task<ActionResult<ProductReviewResponse>> HandleAsync(
    [FromRoute] ApproveProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var updated = await _productReviewService.ApproveProductReview(request.ProductId, request.ReviewId);

    return Ok(updated);
  }
}