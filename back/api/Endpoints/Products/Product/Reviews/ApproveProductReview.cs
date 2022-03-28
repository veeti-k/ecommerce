using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReview.Approve;
using api.Security.Policies;
using api.Specifications.ProductReview;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Products.Product.Reviews;

public class ApproveProductReview : EndpointBaseAsync
  .WithRequest<ApproveProductReviewRequest>
  .WithActionResult<ProductReviewResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductReview> _productReviewRepo;

  public ApproveProductReview(IMapper mapper, IGenericRepo<Models.Product.Product> productRepo, IGenericRepo<ProductReview> productReviewRepo)
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
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var review = await _productReviewRepo.GetById(request.ReviewId);
    if (review is null) throw new ProductReviewNotFoundException(request.ReviewId);

    if (review.IsApproved)
      throw new BadRequestException("Review is already approved");
    
    var reviews = await _productReviewRepo
      .Specify(new ProductReview_GetManyApproved_WithApprovedComments_ByProductId_Spec(request.ProductId))
      .ToListAsync(cancellationToken);

    review.IsApproved = true;

    product.ReviewCount += 1;
    var totalStars = review.Stars + reviews.Aggregate(0, (acc, review) => acc + review.Stars);
    var newAverageStars = (float)totalStars / product.ReviewCount;
    product.AverageStars = newAverageStars;
    
    var updated = await _productReviewRepo.Update(review);
    
    await _productRepo.Update(product);
    return _mapper.Map<ProductReviewResponse>(updated);
  }
}