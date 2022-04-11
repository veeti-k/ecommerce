using api.Data;
using api.Models;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Category;
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
      .Where(p => p.ProductId == productId)
      .FirstOrDefaultAsync();
  }

  public async Task<Product?> GetOneNotDeleted(int productId)
  {
    return await _context.Products
      .Include(product => product.BulletPoints)
      .Include(product => product.Images)
      .Where(p => p.ProductId == productId
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
      .Where(product => product.ProductId == productId)
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

  public async Task<List<Product?>> Search(string query)
  {
    return await _context.Products
      .AsNoTracking()
      .Include(product => product.BulletPoints)
      .Include(product => product.ProductsCategories)
      .Include(product => product.Images)
      .Where(product => !product.IsDeleted
                        && product.Name.ToLower().Contains(query))
      .ToListAsync();
  }
}