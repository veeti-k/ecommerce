using api.DTOs.Product;
using api.Exceptions;
using api.Mapping.MappedTypes.Product;
using api.Models.Product;
using api.Repositories.Interfaces;
using api.Security;
using api.Services.Interfaces;
using AutoMapper;

namespace api.Services;

public class ReviewService : IReviewService
{
  private readonly IMapper _mapper;
  private readonly IReviewRepo _reviewRepo;
  private readonly IUserService _userService;
  private readonly IContextService _contextService;
  private readonly IProductService _productService;
  private readonly IProductReviewCommentRepo _productReviewCommentRepo;

  public ReviewService(
    IMapper aMapper,
    IReviewRepo aReviewRepo,
    IUserService aUserService,
    IContextService aContextService,
    IProductService aProductService,
    IProductReviewCommentRepo aProductReviewCommentRepo)
  {
    _mapper = aMapper;
    _reviewRepo = aReviewRepo;
    _userService = aUserService;
    _contextService = aContextService;
    _productService = aProductService;
    _productReviewCommentRepo = aProductReviewCommentRepo;
  }

  public async Task<ProductReviewCommentResponse> CreateComment(
    CreateProductReviewCommentDTO dto, 
    Guid reviewId,
    int productId)
  {
    var product = await _productService.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var review = await _reviewRepo.GetById(reviewId);
    if (review is null) throw new NotFoundException("Review not found");

    var userId = _contextService.GetCurrentUserId();
    var user = await _userService.GetById(userId, false);
    
    var isEmployee = user is not null && Flags.HasFlag(user.Flags, Flags.EMPLOYEE);

    ProductReviewComment newComment = new()
    {
      CommentersNickname = dto.CommentersNickname,
      Title = dto.Title,
      Content = dto.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ReviewId = review.Id,
      ByEmployee = isEmployee
    };

    var added = await _productReviewCommentRepo.Add(newComment);
    return _mapper.Map<ProductReviewCommentResponse>(added);
  }
  
  public async Task<ProductReviewResponse> CreateReview(CreateProductReviewDTO dto, int productId)
  {
    var product = await _productService.GetById(productId);

    var userId = _contextService.GetCurrentUserId();
    var user = await _userService.GetById(userId, false);

    var isEmployee = user is not null && Flags.HasFlag(user.Flags, Flags.EMPLOYEE);

    ProductReview newReview = new()
    {
      ProductId = product.Id,
      RevieweesNickname = dto.RevieweesNickname,
      Title = dto.Title,
      Content = dto.Content,
      ByEmployee = isEmployee,
      CreatedAt = DateTimeOffset.UtcNow,
      Stars = dto.Stars,
    };

    var added = await _reviewRepo.Add(newReview);
    return _mapper.Map<ProductReviewResponse>(added);
  }

  public async Task RemoveReview(Guid reviewId)
  {
    var review = await _reviewRepo.GetById(reviewId);
    if (review is null) throw new NotFoundException("Review not found");

    await _reviewRepo.Remove(review);
  }

  public async Task RemoveComment(Guid commentId)
  {
    var comment = await _productReviewCommentRepo.GetById(commentId);
    if (comment is null) throw new NotFoundException("Comment not found");

    await _productReviewCommentRepo.Remove(comment);
  }
}