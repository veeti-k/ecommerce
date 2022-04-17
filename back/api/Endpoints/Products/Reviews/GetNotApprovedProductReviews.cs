using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Reviews;

public class GetNotApprovedProductReviews : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<List<NotApprovedProductReviewResponse>>
{
  private readonly IProductReviewRepo _productReviewRepo;
  private readonly IMapper _mapper;

  public GetNotApprovedProductReviews(IProductReviewRepo productReviewRepo, IMapper mapper)
  {
    _productReviewRepo = productReviewRepo;
    _mapper = mapper;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpGet(Routes.Products.ReviewsRoot)]
  public override async Task<ActionResult<List<NotApprovedProductReviewResponse>>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var notApprovedReviews = await _productReviewRepo.GetNotApproved();

    return Ok(_mapper.Map<List<NotApprovedProductReviewResponse>>(notApprovedReviews));
  }
}