﻿#region

using api.Data;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

#endregion

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
                         && question.Id == questionId)
      .FirstOrDefaultAsync();
  }

  public async Task<ProductQuestion?> GetOneApproved(int productId, Guid questionId)
  {
    return await _context.ProductQuestions
      .Where(question => question.ProductId == productId
                         && question.Id == questionId
                         && question.IsApproved)
      .FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<ProductQuestion?>> GetMany(int productId)
  {
    return await _context.ProductQuestions
      .Where(question => question.ProductId == productId)
      .ToListAsync();
  }

  public async Task<IEnumerable<ProductQuestion?>> GetManyApproved(int productId)
  {
    return await _context.ProductQuestions
      .Where(question => question.ProductId == productId
                         && question.IsApproved)
      .ToListAsync();
  }

  public async Task<IEnumerable<ProductQuestion?>> GetManyWithApprovedAnswers(int productId)
  {
    return await _context.ProductQuestions
      .Include(question => question.Answers.Where(a => a.IsApproved))
      .Where(question => question.ProductId == productId
                         && question.IsApproved)
      .ToListAsync();
  }

  public async Task<IEnumerable<ProductQuestion?>> GetManyApprovedWithApprovedAnswers(int productId)
  {
    return await _context.ProductQuestions
      .Include(question => question.Answers.Where(answer => answer.IsApproved))
      .Where(question => question.ProductId == productId
                         && question.IsApproved)
      .ToListAsync();
  }
}