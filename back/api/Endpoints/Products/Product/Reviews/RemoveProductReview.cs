using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class RemoveProductReview : EndpointBaseAsync
  .WithRequest<DeleteProductReviewRequest>
  .WithActionResult
{
  private readonly IGenericRepo<ProductReview> _repo;

  public RemoveProductReview(IGenericRepo<ProductReview> repo)
  {
    _repo = repo;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.Product.ReviewsRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] DeleteProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var review = await _repo.GetById(request.ReviewId);
    if (review is null) 
      throw new NotFoundException($"Review with id {request.ReviewId} was not found");

    await _repo.Delete(review);
    return NoContent();
  }
}