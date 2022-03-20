using api.Data;
using api.Models.Product.Question;
using api.Repositories.Interfaces.ProductRepos;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.ProductRepos;

public class ProductQuestionAnswerRepo : IProductQuestionAnswerRepo
{
  private readonly DataContext _context;

  public ProductQuestionAnswerRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<ProductQuestionAnswer?> GetById(Guid commentId)
  {
    return await _context.ProductQuestionAnswers.Where(comment => comment.Id == commentId).FirstOrDefaultAsync();
  }

  public async Task<ProductQuestionAnswer> Add(ProductQuestionAnswer productReviewComment)
  {
    var added = _context.Add(productReviewComment);
    await _context.SaveChangesAsync();

    return added.Entity;
  }
  
  public async Task<ProductQuestionAnswer> Update(ProductQuestionAnswer productReviewComment)
  {
    var updated = _context.Update(productReviewComment);
    await _context.SaveChangesAsync();

    return updated.Entity;
  }

  public async Task Remove(ProductQuestionAnswer productReviewComment)
  {
    _context.Remove(productReviewComment);
    await _context.SaveChangesAsync();
  }
}