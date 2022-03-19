using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class CreateProductReviewRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public CreateProductReviewDTO Dto { get; set; }
}

public class CreateProductReview : EndpointBaseAsync
  .WithRequest<CreateProductReviewRequest>
  .WithActionResult<ProductReviewResponse>
{
  private readonly IProductReviewService _productReviewService;

  public CreateProductReview(IProductReviewService aProductProductReviewService)
  {
    _productReviewService = aProductProductReviewService;
  }

  [HttpPost(Routes.Products.Product.ReviewsRoot)]
  public override async Task<ActionResult<ProductReviewResponse>> HandleAsync(
    [FromRoute] CreateProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var created = await _productReviewService.CreateReview(request.Dto, request.ProductId);

    return Created("", created);
  }
}