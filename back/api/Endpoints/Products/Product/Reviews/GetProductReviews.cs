using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReview.Get;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class GetProductReviews : EndpointBaseAsync
  .WithRequest<GetProductReviewsForProductRequest>
  .WithActionResult<IEnumerable<ProductReviewResponse>>
{
  private readonly IMapper _mapper;
  private readonly IProductReviewRepo _productReviewRepo;
  private readonly IProductRepo _productRepo;


  public GetProductReviews(
    IMapper mapper,
    IProductReviewRepo productReviewRepo,
    IProductRepo productRepo)
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
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var reviews = await _productReviewRepo.GetManyApprovedWithApprovedComments(request.ProductId);

    return Ok(_mapper.Map<IEnumerable<ProductReviewResponse>>(reviews));
  }
}