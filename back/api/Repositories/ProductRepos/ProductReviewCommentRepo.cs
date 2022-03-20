using api.Data;
using api.Models.Product.Review;
using api.Repositories.Interfaces.ProductRepos;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.ProductRepos;

public class ProductReviewCommentRepo : IProductReviewCommentRepo
{
  private readonly DataContext _context;

  public ProductReviewCommentRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<ProductReviewComment?> GetById(Guid commentId)
  {
    return await _context.ProductReviewComments.Where(comment => comment.Id == commentId).FirstOrDefaultAsync();
  }

  public async Task<ProductReviewComment> Add(ProductReviewComment productReviewComment)
  {
    var added = _context.Add(productReviewComment);
    await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task<ProductReviewComment> Update(ProductReviewComment productReviewComment)
  {
    var updated = _context.Update(productReviewComment);
    await _context.SaveChangesAsync();

    return updated.Entity;
  }

  public async Task Remove(ProductReviewComment productReviewComment)
  {
    _context.Remove(productReviewComment);
    await _context.SaveChangesAsync();
  }
}