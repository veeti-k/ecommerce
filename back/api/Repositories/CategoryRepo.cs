﻿using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class CategoryRepo : GenericRepo<ProductCategory>, ICategoryRepo
{
  private readonly DataContext _context;

  public CategoryRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<List<ProductCategory?>> GetByParentId(int parentId)
  {
    return await _context.ProductCategories
      .Where(c => c.ParentId == parentId)
      .ToListAsync();
  }
}