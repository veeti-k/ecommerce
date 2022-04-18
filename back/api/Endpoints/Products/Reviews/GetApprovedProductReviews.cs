using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Reviews;

public class GetApprovedProductReviews : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<List<ProductReviewResponseWithProduct>>
{
  private readonly IMapper _mapper;
  private readonly IProductReviewRepo _productReviewRepo;
  
  public GetApprovedProductReviews(IMapper mapper, IProductReviewRepo productReviewRepo)
  {
    _mapper = mapper;
    _productReviewRepo = productReviewRepo;
  }
  
  [HttpGet(Routes.Products.ApprovedReviews)]
  public override async Task<ActionResult<List<ProductReviewResponseWithProduct>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var reviews = await _productReviewRepo.GetAllApprovedWithProduct();

    return _mapper.Map<List<ProductReviewResponseWithProduct>>(reviews);
  }
}