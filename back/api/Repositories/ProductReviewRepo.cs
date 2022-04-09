using api.Data;
using api.Models.Review;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ProductReviewRepo : GenericRepo<ProductReview>, IProductReviewRepo
{
  private readonly DataContext _context;

  public ProductReviewRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<ProductReview?> GetOne(int productId, Guid reviewId)
  {
    return await _context.ProductReviews
      .Where(review => review.ProductId == productId
                       && review.Id == reviewId)
      .FirstOrDefaultAsync();
  }

  public async Task<ProductReview?> GetOneApproved(int productId, Guid reviewId)
  {
    return await _context.ProductReviews
      .Where(review => review.ProductId == productId
                       && review.Id == reviewId
                       && review.IsApproved)
      .FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<ProductReview?>> GetMany(int productId)
  {
    return await _context.ProductReviews
      .Where(review => review.ProductId == productId)
      .ToListAsync();
  }

  public async Task<IEnumerable<ProductReview?>> GetManyApproved(int productId)
  {
    return await _context.ProductReviews
      .Where(review => review.ProductId == productId
                       && review.IsApproved)
      .ToListAsync();
  }

  public async Task<IEnumerable<ProductReview?>> GetManyWithApprovedComments(int productId)
  {
    return await _context.ProductReviews
      .Include(review => review.Comments.Where(a => a.IsApproved))
      .Where(review => review.ProductId == productId
                       && review.IsApproved)
      .ToListAsync();
  }

  public async Task<IEnumerable<ProductReview?>> GetManyApprovedWithApprovedComments(int productId)
  {
    return await _context.ProductReviews
      .Include(review => review.Comments.Where(answer => answer.IsApproved))
      .Where(review => review.ProductId == productId
                       && review.IsApproved)
      .ToListAsync();
  }
}