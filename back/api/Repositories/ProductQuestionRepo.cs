using api.Data;
using api.Models.Question;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ProductQuestionRepo : GenericRepo<ProductQuestion>, IProductQuestionRepo
{
  private readonly DataContext _context;

  public ProductQuestionRepo(DataContext dataContext) : base(dataContext)
  {
    _context = dataContext;
  }

  public async Task<ProductQuestion?> GetOne(int productId, Guid questionId)
  {
    return await _context.ProductQuestions
      .Where(question => question.ProductId == productId
                         && question.ProductQuestionId == questionId)
      .FirstOrDefaultAsync();
  }

  public async Task<ProductQuestion?> GetOneApproved(int productId, Guid questionId)
  {
    return await _context.ProductQuestions
      .Where(question => question.ProductId == productId
                         && question.ProductQuestionId == questionId
                         && question.IsApproved)
      .FirstOrDefaultAsync();
  }

  public async Task<List<ProductQuestion?>> GetMany(int productId)
  {
    return await _context.ProductQuestions
      .Where(question => question.ProductId == productId)
      .ToListAsync();
  }

  public async Task<List<ProductQuestion?>> GetManyApproved(int productId)
  {
    return await _context.ProductQuestions
      .Where(question => question.ProductId == productId
                         && question.IsApproved)
      .ToListAsync();
  }

  public async Task<List<ProductQuestion?>> GetManyWithApprovedAnswers(int productId)
  {
    return await _context.ProductQuestions
      .Include(question => question.Answers.Where(a => a.IsApproved))
      .Where(question => question.ProductId == productId
                         && question.IsApproved)
      .ToListAsync();
  }

  public async Task<List<ProductQuestion?>> GetManyApprovedWithApprovedAnswers(int productId)
  {
    return await _context.ProductQuestions
      .Include(question => question.Answers.Where(answer => answer.IsApproved))
      .Where(question => question.ProductId == productId
                         && question.IsApproved)
      .ToListAsync();
  }

  public async Task<List<ProductQuestion?>> GetAllNotApprovedWithProduct()
  {
    return await _context.ProductQuestions
      .AsNoTracking()
      .Include(question => question.Product)
      .Where(question => !question.IsApproved)
      .ToListAsync();
  }

  public async Task<List<ProductQuestion?>> GetAllApprovedWithProduct()
  {
    return await _context.ProductQuestions
      .AsNoTracking()
      .Include(question => question.Product)
      .Where(question => question.IsApproved)
      .ToListAsync();
  }
}