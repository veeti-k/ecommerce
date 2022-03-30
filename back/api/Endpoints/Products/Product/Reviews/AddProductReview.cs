using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReview;
using api.RequestsAndResponses.ProductReview.Add;
using api.Security;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews;

public class AddProductReview : EndpointBaseAsync
  .WithRequest<AddProductReviewRequest>
  .WithActionResult<ProductReviewResponse>
{
  private readonly IMapper _mapper;
  private readonly IUserRepo _userRepo;
  private readonly IContextService _contextService;
  private readonly IProductRepo _productRepo;
  private readonly IProductReviewRepo _reviewRepo;


  public AddProductReview(
    IMapper mapper,
    IUserRepo userRepo,
    IContextService contextService,
    IProductRepo productRepo,
    IProductReviewRepo reviewRepo)
  {
    _mapper = mapper;
    _userRepo = userRepo;
    _contextService = contextService;
    _productRepo = productRepo;
    _reviewRepo = reviewRepo;
  }

  [HttpPost(Routes.Products.Product.ReviewsRoot)]
  public override async Task<ActionResult<ProductReviewResponse>> HandleAsync(
    [FromRoute] AddProductReviewRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null)
      throw new ProductNotFoundException(request.ProductId);

    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);

    var isEmployee = user is not null && user.Flags.HasFlag(Flags.EMPLOYEE);

    ProductReview newReview = new()
    {
      ProductId = product.Id,
      ReviewersNickname = request.Dto.ReviewersNickname,
      Title = request.Dto.Title,
      Content = request.Dto.Content,
      ByEmployee = isEmployee,
      CreatedAt = DateTimeOffset.UtcNow,
      Stars = request.Dto.Stars,
    };

    var added = await _reviewRepo.Add(newReview);
    return Created("", _mapper.Map<ProductReviewResponse>(added));
  }
}