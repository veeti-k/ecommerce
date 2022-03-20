using api.Data;
using api.Models.Product.Review;
using api.Repositories.Interfaces.ProductRepos;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.ProductRepos;

public class ProductProductReviewRepo : IProductReviewRepo
{
  private readonly DataContext _context;
  private readonly IQueryable<ProductReview> _productReviewsWithComments;

  public ProductProductReviewRepo(DataContext aContext)
  {
    _context = aContext;
    _productReviewsWithComments = _context.ProductReviews
      .Where(review => review.IsApproved)
      .Include(review => review.Comments);
  }

  public async Task<ProductReview?> GetById(Guid reviewId)
  {
    return await _context.ProductReviews.Where(rev => rev.Id == reviewId).FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<ProductReview?>> GetApprovedByProductId(int productId)
  {
    return await _context.ProductReviews
      .Where(review => review.ProductId == productId && review.IsApproved).ToListAsync();
  }

  public async Task<IEnumerable<ProductReview?>> GetWithCommentsByProductId(int productId)
  {
    return await _productReviewsWithComments.Where(rev => rev.ProductId == productId).ToListAsync();
  }

  public async Task<ProductReview> Add(ProductReview productReview)
  {
    var added = _context.Add(productReview);
    await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task<ProductReview> Update(ProductReview productReview, bool saveNow = true)
  {
    var updated = _context.Update(productReview);
    if (saveNow) await _context.SaveChangesAsync();

    return updated.Entity;
  }

  public async Task Remove(ProductReview productReview)
  {
    _context.Remove(productReview);
    await _context.SaveChangesAsync();
  }
}