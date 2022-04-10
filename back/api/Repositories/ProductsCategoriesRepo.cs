﻿using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ProductsCategoriesRepo : GenericRepo<ProductsCategories>, IProductsCategoriesRepo
{
  private readonly DataContext _context;

  public ProductsCategoriesRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<List<ProductsCategories?>> GetManyByProductId(int productId)
  {
    return await _context.ProductsCategories
      .Where(pc => pc.ProductId == productId)
      .ToListAsync();
  }
}