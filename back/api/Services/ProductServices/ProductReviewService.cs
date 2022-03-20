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

public class ProductReviewService : IProductReviewService
{
  private readonly IMapper _mapper;
  private readonly IUserRepo _userRepo;
  private readonly IProductRepo _productRepo;
  private readonly IContextService _contextService;
  private readonly IProductReviewRepo _productReviewRepo;

  public ProductReviewService(
    IMapper aMapper,
    IUserRepo aUserRepo,
    IProductRepo aProductRepo,
    IContextService aContextService,
    IProductReviewRepo aProductReviewRepo)
  {
    _mapper = aMapper;
    _userRepo = aUserRepo;
    _productRepo = aProductRepo;
    _contextService = aContextService;
    _productReviewRepo = aProductReviewRepo;
  }

  public async Task<ProductReviewResponse> CreateReview(CreateProductReviewDTO dto, int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);

    var isEmployee = user is not null && Flags.HasFlag(user.Flags, Flags.EMPLOYEE);

    ProductReview newReview = new()
    {
      ProductId = product.Id,
      ReviewersNickname = dto.ReviewersNickname,
      Title = dto.Title,
      Content = dto.Content,
      ByEmployee = isEmployee,
      CreatedAt = DateTimeOffset.UtcNow,
      Stars = dto.Stars,
    };

    var added = await _productReviewRepo.Add(newReview);
    return _mapper.Map<ProductReviewResponse>(added);
  }

  public async Task<IEnumerable<ProductReviewResponse>> GetProductReviews(int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var reviews = await _productReviewRepo.GetWithCommentsByProductId(productId);
    if (!reviews.Any()) throw new NotFoundException("No reviews found");

    return _mapper.Map<IEnumerable<ProductReviewResponse>>(reviews);
  }

  public async Task<ProductReviewResponse> ApproveProductReview(int productId, Guid reviewId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var review = await _productReviewRepo.GetById(reviewId);
    if (review is null) throw new NotFoundException("Review not found");

    var reviews = await _productReviewRepo.GetApprovedByProductId(productId);

    review.IsApproved = true;

    product.ReviewCount += 1;
    var totalStars = review.Stars + reviews.Aggregate(0, (acc, review) => review.Stars);
    var newAverageStars = (float)totalStars / product.ReviewCount;
    product.AverageStars = newAverageStars;
    
    var updated = await _productReviewRepo.Update(review, false);
    await _productRepo.Update(product);
    return _mapper.Map<ProductReviewResponse>(updated);
  }

  public async Task RemoveReview(Guid reviewId)
  {
    var review = await _productReviewRepo.GetById(reviewId);
    if (review is null) throw new NotFoundException("Review not found");

    await _productReviewRepo.Remove(review);
  }
}