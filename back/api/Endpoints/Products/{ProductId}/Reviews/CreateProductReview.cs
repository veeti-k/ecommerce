using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.ProductId.Reviews;

public class CreateProductReviewRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public CreateProductReviewDTO Dto { get; set; }
}

public class CreateProductReview : EndpointBaseAsync
  .WithRequest<CreateProductReviewRequest>
  .WithActionResult<ProductReviewResponse>
{
  private readonly IReviewService _reviewService;

  public CreateProductReview(IReviewService reviewService)
  {
    _reviewService = reviewService;
  }

  [HttpPost(Routes.Products.Reviews)]
  public override async Task<ActionResult<ProductReviewResponse>> HandleAsync(
    [FromRoute] CreateProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var created = await _reviewService.CreateReview(request.Dto, request.ProductId);

    return Created("", created);
  }
}