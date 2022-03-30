using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReview.Approve;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class ApproveProductReview : EndpointBaseAsync
  .WithRequest<ApproveProductReviewRequest>
  .WithActionResult<ProductReviewResponse>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly IProductReviewRepo _productReviewRepo;

  public ApproveProductReview(IMapper mapper, IProductRepo productRepo, IProductReviewRepo productReviewRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productReviewRepo = productReviewRepo;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpPatch(Routes.Products.Product.Reviews.ReviewRoot)]
  public override async Task<ActionResult<ProductReviewResponse>> HandleAsync(
    [FromRoute]ApproveProductReviewRequest request, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var review = await _productReviewRepo.GetOne(request.ProductId, request.ReviewId);
    if (review is null) throw new ProductReviewNotFoundException(request.ReviewId);

    if (review.IsApproved)
      throw new BadRequestException("Review is already approved");

    var existingReviews = await _productReviewRepo.GetManyApprovedWithApprovedComments(request.ProductId);

    review.IsApproved = true;

    product.ReviewCount += 1;
    var totalStars = review.Stars + existingReviews.Aggregate(0, (acc, review) => acc + review.Stars);
    var newAverageStars = (float)totalStars / product.ReviewCount;
    product.AverageStars = newAverageStars;
    
    var updated = await _productReviewRepo.Update(review);
    
    await _productRepo.Update(product);
    return _mapper.Map<ProductReviewResponse>(updated);
  }
}