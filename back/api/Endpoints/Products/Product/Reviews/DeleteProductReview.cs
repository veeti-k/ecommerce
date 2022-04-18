using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview.Delete;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class DeleteProductReview : EndpointBaseAsync
  .WithRequest<DeleteProductReviewRequest>
  .WithActionResult
{
  private readonly IProductReviewRepo _productReviewRepo;
  private readonly IProductRepo _productRepo;
  private readonly IRevalidationService _revalidationService;

  public DeleteProductReview(
    IProductReviewRepo productReviewRepo,
    IProductRepo productRepo,
    IRevalidationService revalidationService)
  {
    _productReviewRepo = productReviewRepo;
    _productRepo = productRepo;
    _revalidationService = revalidationService;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.Product.Reviews.ReviewRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] DeleteProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null)
      throw new ProductNotFoundException(request.ProductId);

    var review = await _productReviewRepo.GetOne(request.ProductId, request.ReviewId);
    if (review is null)
      throw new ProductReviewNotFoundException(request.ReviewId);

    await _productReviewRepo.Delete(review);

    var reviews = await _productReviewRepo.GetManyApproved(request.ProductId);
    product.ReviewCount = reviews.Count;

    var totalStars = reviews.Aggregate(0, (acc, review) => acc + review.Stars);
    product.AverageStars = (float) totalStars / reviews.Count;

    await _productRepo.Update(product);

    _revalidationService.RevalidateProduct(request.ProductId);

    return NoContent();
  }
}