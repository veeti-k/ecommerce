using api.Data;
using api.Models.Product.Review;
using api.Repositories.Interfaces.ProductRepos;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.ProductRepos;

public class ProductProductReviewRepo : IProductReviewRepo
{
  private readonly DataContext _context;

  public ProductProductReviewRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<ProductReview?> GetById(Guid reviewId)
  {
    return await _context.ProductReviews.Where(rev => rev.Id == reviewId).FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<ProductReview?>> GetByProductId(int productId)
  {
    return await _context.ProductReviews.Where(rev => rev.ProductId == productId).ToListAsync();
  }

  public async Task<ProductReview> Add(ProductReview productReview)
  {
    var added = _context.Add(productReview);
    await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task Remove(ProductReview productReview)
  {
    _context.Remove(productReview);
    await _context.SaveChangesAsync();
  }
}