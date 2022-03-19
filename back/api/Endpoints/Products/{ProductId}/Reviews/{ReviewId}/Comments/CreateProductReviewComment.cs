using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.ProductId.Reviews.ReviewId.Comments;

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
  private readonly IReviewService _reviewService;

  public CreateProductReviewComment(IReviewService aReviewService)
  {
    _reviewService = aReviewService;
  }

  [HttpPost(Routes.Products.ReviewComments)]
  public override async Task<ActionResult<ProductReviewCommentResponse>> HandleAsync(
    [FromRoute] CreateProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var created = await _reviewService.CreateComment(request.Dto, request.ReviewId, request.ProductId);

    return Created("", created);
  }
}