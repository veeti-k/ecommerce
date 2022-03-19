using api.Data;
using api.Models.Product;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ReviewRepo : IReviewRepo
{
  private readonly DataContext _context;

  public ReviewRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<ProductReview?> GetById(Guid reviewId)
  {
    return await _context.ProductReviews.Where(rev => rev.Id == reviewId).FirstOrDefaultAsync();
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