using api.Data;
using api.Models.Review;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ProductReviewCommentRepo : GenericRepo<ProductReviewComment>, IProductReviewCommentRepo
{
  private readonly DataContext _context;

  public ProductReviewCommentRepo(DataContext context) : base(context)
  {
    _context = context;
  }
  
  public async Task<ProductReviewComment?> GetOne(Guid reviewId, Guid commentId)
  {
    return await _context.ProductReviewComments
      .Where(comment => comment.ReviewId == reviewId
                         && comment.Id == commentId)
      .FirstOrDefaultAsync();
  }

  public async Task<ProductReviewComment?> GetOneApproved(Guid reviewId, Guid commentId)
  {
    return await _context.ProductReviewComments
      .Where(comment => comment.ReviewId == reviewId
                         && comment.Id == commentId
                         && comment.IsApproved)
      .FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<ProductReviewComment?>> GetMany(Guid reviewId)
  {
    return await _context.ProductReviewComments
      .Where(comment => comment.ReviewId == reviewId)
      .ToListAsync();
  }

  public async Task<IEnumerable<ProductReviewComment?>> GetManyApproved(Guid reviewId)
  {
    return await _context.ProductReviewComments
      .Where(comment => comment.ReviewId == reviewId
                         && comment.IsApproved)
      .ToListAsync();
  }
}