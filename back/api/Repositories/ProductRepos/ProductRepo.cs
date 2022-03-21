using api.Data;
using api.Models.Product;
using api.Repositories.Interfaces.ProductRepos;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.ProductRepos;

public class ProductRepo : IProductRepo
{
  private readonly DataContext _context;
  private readonly IQueryable<Product> _products;

  public ProductRepo(DataContext context)
  {
    _context = context;
    _products = _context.Products.Where(product => !product.IsDeleted);
  }

  public async Task<Product?> GetById(int productId)
  {
    return await _products
      .Include(product => product.BulletPoints)
      .Where(product => product.Id == productId)
      .FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<Product?>> GetAll()
  {
    return await _products.ToListAsync();
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