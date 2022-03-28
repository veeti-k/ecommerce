using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class DeleteProductReview : EndpointBaseAsync
  .WithRequest<DeleteProductReviewRequest>
  .WithActionResult
{
  private readonly IGenericRepo<ProductReview> _repo;

  public DeleteProductReview(IGenericRepo<ProductReview> repo)
  {
    _repo = repo;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.Product.Reviews.ReviewRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] DeleteProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var review = await _repo.GetById(request.ReviewId);
    if (review is null)
      throw new ProductReviewNotFoundException(request.ReviewId);

    await _repo.Delete(review);
    return NoContent();
  }
}