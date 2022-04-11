using api.Data;
using api.Models.Question;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ProductQuestionAnswerRepo : GenericRepo<ProductQuestionAnswer>, IProductQuestionAnswerRepo
{
  private readonly DataContext _context;

  public ProductQuestionAnswerRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<ProductQuestionAnswer?> GetOne(Guid questionId, Guid answerId)
  {
    return await _context.ProductQuestionAnswers
      .Where(answer => answer.QuestionId == questionId
                  && answer.ProductQuestionAnswerId == answerId)
      .FirstOrDefaultAsync();
  }

  public async Task<ProductQuestionAnswer?> GetOneApproved(Guid questionId, Guid answerId)
  {
    return await _context.ProductQuestionAnswers
      .Where(answer => answer.QuestionId == questionId
                  && answer.ProductQuestionAnswerId == answerId
                  && answer.IsApproved)
      .FirstOrDefaultAsync();
  }

  public async Task<List<ProductQuestionAnswer?>> GetMany(Guid questionId)
  {
    return await _context.ProductQuestionAnswers
      .Where(answer => answer.QuestionId == questionId)
      .ToListAsync();
  }

  public async Task<List<ProductQuestionAnswer?>> GetManyApproved(Guid questionId)
  {
    return await _context.ProductQuestionAnswers
      .Where(answer => answer.QuestionId == questionId
                  && answer.IsApproved)
      .ToListAsync();
  }
}