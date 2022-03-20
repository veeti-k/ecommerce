using api.DTOs.Product;
using api.Exceptions;
using api.Mapping.MappedTypes.Product;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.Repositories.Interfaces.ProductRepos;
using api.Security;
using api.Services.Interfaces;
using api.Services.Interfaces.ProductServices;
using AutoMapper;

namespace api.Services.ProductServices;

public class ProductReviewCommentService : IProductReviewCommentService
{
  private readonly IMapper _mapper;
  private readonly IUserRepo _userRepo;
  private readonly IReviewRepo _reviewRepo;
  private readonly IProductRepo _productRepo;
  private readonly IContextService _contextService;
  private readonly IProductReviewCommentRepo _productReviewCommentRepo;

  public ProductReviewCommentService(
    IMapper aMapper,
    IUserRepo aUserRepo,
    IReviewRepo aReviewRepo,
    IProductRepo aProductRepo,
    IContextService aContextService,
    IProductReviewCommentRepo aProductReviewCommentRepo)
  {
    _mapper = aMapper;
    _userRepo = aUserRepo;
    _reviewRepo = aReviewRepo;
    _productRepo = aProductRepo;
    _contextService = aContextService;
    _productReviewCommentRepo = aProductReviewCommentRepo;
  }

  public async Task<ProductReviewCommentResponse> CreateComment(
    CreateProductReviewCommentDTO dto,
    Guid reviewId,
    int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var review = await _reviewRepo.GetById(reviewId);
    if (review is null) throw new NotFoundException("Review not found");

    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);

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

  public async Task RemoveComment(int productId, Guid reviewId, Guid commentId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var review = await _reviewRepo.GetById(reviewId);
    if (review is null) throw new NotFoundException("Review not found");

    var comment = await _productReviewCommentRepo.GetById(commentId);
    if (comment is null) throw new NotFoundException("Comment not found");

    await _productReviewCommentRepo.Remove(comment);
  }
}