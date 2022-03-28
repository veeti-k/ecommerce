using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview.Delete;
using api.Security.Policies;
using api.Specifications.Product;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Products.Product.Reviews;

public class DeleteProductReview : EndpointBaseAsync
  .WithRequest<DeleteProductReviewRequest>
  .WithActionResult
{
  private readonly IGenericRepo<ProductReview> _productReviewRepo;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;

  public DeleteProductReview(
    IGenericRepo<ProductReview> productReviewRepo,
    IGenericRepo<Models.Product.Product> productRepo)
  {
    _productReviewRepo = productReviewRepo;
    _productRepo = productRepo;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.Product.Reviews.ReviewRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] DeleteProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) 
      throw new ProductNotFoundException(request.ProductId);
    
    var review = await _productReviewRepo.GetById(request.ReviewId);
    if (review is null)
      throw new ProductReviewNotFoundException(request.ReviewId);

    await _productReviewRepo.Delete(review);
    return NoContent();
  }
}