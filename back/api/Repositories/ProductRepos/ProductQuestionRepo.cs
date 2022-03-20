using api.Data;
using api.Models.Product.Question;
using api.Repositories.Interfaces.ProductRepos;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.ProductRepos;

public class ProductQuestionRepo : IProductQuestionRepo
{
  private readonly DataContext _context;

  public ProductQuestionRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<ProductQuestion?> GetById(Guid questionId)
  {
    return await _context.ProductQuestions.Where(question => question.Id == questionId).FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<ProductQuestion?>> GetApprovedWithAnswersByProductId(int productId)
  {
    return await _context.ProductQuestions
      .Include(question => question.Answers)
      .Where(question => question.ProductId == productId && question.IsApproved)
      .Select(question => new ProductQuestion()
      {
        Id = question.Id,
        Content = question.Content,
        Title = question.Title,
        CreatedAt = question.CreatedAt,
        ProductId = question.ProductId,
        IsApproved = question.IsApproved,
        QuestionersNickname = question.QuestionersNickname,
        Answers = question.Answers.Where(answer => answer.IsApproved)
      })
      .ToListAsync();
  }

  public async Task<ProductQuestion> Add(ProductQuestion productQuestion)
  {
    var added = _context.Add(productQuestion);
    await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task<ProductQuestion> Update(ProductQuestion productQuestion, bool saveNow = true)
  {
    var updated = _context.Update(productQuestion);
    if (saveNow) await _context.SaveChangesAsync();

    return updated.Entity;
  }

  public async Task Remove(ProductQuestion productReview)
  {
    _context.Remove(productReview);
    await _context.SaveChangesAsync();
  }
}