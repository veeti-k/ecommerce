using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReview.Get;
using api.Specifications.ProductReview;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Products.Product.Reviews;

public class GetProductReviews : EndpointBaseAsync
  .WithRequest<GetProductReviewsForProductRequest>
  .WithActionResult<IEnumerable<ProductReviewResponse>>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<ProductReview> _productReviewRepo;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;


  public GetProductReviews(
    IMapper mapper, 
    IGenericRepo<ProductReview> productReviewRepo, 
    IGenericRepo<Models.Product.Product> productRepo)
  {
    _mapper = mapper;
    _productReviewRepo = productReviewRepo;
    _productRepo = productRepo;
  }

  [HttpGet(Routes.Products.Product.ReviewsRoot)]
  public override async Task<ActionResult<IEnumerable<ProductReviewResponse>>> HandleAsync(
    [FromRoute] GetProductReviewsForProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);
    
    var reviews = await _productReviewRepo
      .Specify(new ProductReview_GetManyApproved_WithApprovedComments_ByProductId_Spec(request.ProductId))
      .ToListAsync(cancellationToken);
    
    return Ok(_mapper.Map<IEnumerable<ProductReviewResponse>>(reviews));
  }
}