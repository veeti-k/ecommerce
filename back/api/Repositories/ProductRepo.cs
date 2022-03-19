using System.Linq.Expressions;
using api.Data;
using api.Models.Product;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Repositories;

public class ProductRepo : IProductRepo
{
  private readonly DataContext _context;
  private readonly IQueryable<Product> _productsWithReviews;
  private readonly IQueryable<Product> _productsWithEverything;

  public ProductRepo(DataContext context)
  {
    _context = context;
    _productsWithReviews = _context.Products
      .Include(product => product.Reviews);
    _productsWithEverything = _productsWithReviews
      .Include(product => product.Questions);
  }

  public async Task<Product?> GetById(int productId)
  {
    return await _context.Products.Where(product => product.Id == productId).FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<Product?>> GetManyWithReviews(Expression<Func<Product, bool>> filter)
  {
    return await _productsWithReviews.Where(filter).ToListAsync();
  }

  public async Task<Product?> GetOneWithEverything(int productId)
  {
    return await _productsWithEverything
      .Where(product => product.Id == productId).FirstOrDefaultAsync();
  }

  public async Task<Product> Add(Product product)
  {
    var addedProduct = _context.Add(product);
    await _context.SaveChangesAsync();

    return addedProduct.Entity;
  }

  public async Task<Product> Update(Product product)
  {
    var updatedProduct = _context.Update(product);
    await _context.SaveChangesAsync();

    return updatedProduct.Entity;
  }
}