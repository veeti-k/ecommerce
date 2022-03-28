using api.Exceptions;
using api.Models.Product.Review;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReviewComment;
using api.RequestsAndResponses.ProductReviewComment.Add;
using api.Security;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews.Comments;

public class AddProductReviewComment : EndpointBaseAsync
  .WithRequest<CreateProductReviewCommentRequest>
  .WithActionResult<ProductReviewCommentResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<User> _userRepo;
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductReview> _productReviewRepo;
  private readonly IGenericRepo<ProductReviewComment> _productReviewCommentRepo;

  public AddProductReviewComment(
    IMapper mapper,
    IGenericRepo<User> userRepo,
    IContextService contextService,
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductReview> productReviewRepo,
    IGenericRepo<ProductReviewComment> productReviewCommentRepo)
  {
    _mapper = mapper;
    _userRepo = userRepo;
    _contextService = contextService;
    _productRepo = productRepo;
    _productReviewRepo = productReviewRepo;
    _productReviewCommentRepo = productReviewCommentRepo;
  }

  [HttpPost(Routes.Products.Product.Reviews.Review.CommentsRoot)]
  public override async Task<ActionResult<ProductReviewCommentResponse>> HandleAsync(
    [FromRoute] CreateProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var review = await _productReviewRepo.GetById(request.ReviewId);
    if (review is null) throw new ProductReviewNotFoundException(request.ReviewId);

    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);

    var isEmployee = user is not null && Flags.HasFlag(user.Flags, Flags.EMPLOYEE);

    ProductReviewComment newComment = new()
    {
      CommentersNickname = request.Dto.CommentersNickname,
      Title = request.Dto.Title,
      Content = request.Dto.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ReviewId = review.Id,
      ByEmployee = isEmployee
    };

    var added = await _productReviewCommentRepo.Add(newComment);
    return _mapper.Map<ProductReviewCommentResponse>(added);
  }
}