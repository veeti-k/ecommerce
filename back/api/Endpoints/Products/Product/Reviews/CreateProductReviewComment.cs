using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class CreateProductReviewCommentRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
  [FromBody] public CreateProductReviewCommentDTO Dto { get; set; }
}

public class CreateProductReviewComment : EndpointBaseAsync
  .WithRequest<CreateProductReviewCommentRequest>
  .WithActionResult<ProductReviewCommentResponse>
{
  private readonly IProductReviewService _productReviewService;

  public CreateProductReviewComment(IProductReviewService aProductProductReviewService)
  {
    _productReviewService = aProductProductReviewService;
  }

  [HttpPost(Routes.Products.Product.Reviews.Review.CommentsRoot)]
  public override async Task<ActionResult<ProductReviewCommentResponse>> HandleAsync(
    [FromRoute] CreateProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var created = await _productReviewService.CreateComment(request.Dto, request.ReviewId, request.ProductId);

    return Created("", created);
  }
}