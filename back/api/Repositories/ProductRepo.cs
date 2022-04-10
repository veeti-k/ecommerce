using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ProductRepo : GenericRepo<Product>, IProductRepo
{
  private readonly DataContext _context;

  public ProductRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<Product?> GetOne(int productId)
  {
    return await _context.Products
      .Include(product => product.BulletPoints)
      .Include(product => product.Images)
      .Where(p => p.Id == productId)
      .FirstOrDefaultAsync();
  }

  public async Task<Product?> GetOneNotDeleted(int productId)
  {
    return await _context.Products
      .Include(product => product.BulletPoints)
      .Include(product => product.Images)
      .Where(p => p.Id == productId
                  && !p.IsDeleted)
      .FirstOrDefaultAsync();
  }

  public async Task<Product?> GetOneNotDeletedWithCategories(int productId)
  {
    return await _context.Products
      .Include(product => product.BulletPoints)
      .Include(product => product.Images)
      .Include(product => product.ProductsCategories)
      .ThenInclude(pc => pc.Category)
      .Where(product => product.Id == productId)
      .FirstOrDefaultAsync();
  }

  public async Task<List<Product?>> GetManyNotDeleted()
  {
    return await _context.Products
      .Include(product => product.BulletPoints)
      .Include(product => product.ProductsCategories)
      .Include(product => product.Images)
      .Where(product => !product.IsDeleted)
      .ToListAsync();
  }
}