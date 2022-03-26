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
  private readonly IGenericRepo<ProductReview> _repo;

  public GetProductReviews(IGenericRepo<ProductReview> repo, IMapper mapper)
  {
    _repo = repo;
    _mapper = mapper;
  }

  [HttpGet(Routes.Products.Product.ReviewsRoot)]
  public override async Task<ActionResult<IEnumerable<ProductReviewResponse>>> HandleAsync(
    [FromRoute] GetProductReviewsForProductRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var reviews = await _repo
      .Specify(new ProductReview_GetMany_WithApprovedComments_ByProductId_Spec(request.ProductId))
      .ToListAsync(cancellationToken);
    
    return Ok(_mapper.Map<IEnumerable<ProductReviewResponse>>(reviews));
  }
}