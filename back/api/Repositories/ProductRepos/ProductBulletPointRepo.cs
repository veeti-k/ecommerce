using api.Data;
using api.Models.Product;
using api.Repositories.Interfaces.ProductRepos;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.ProductRepos;

public class ProductBulletPointRepo : IProductBulletPointRepo
{
  private readonly DataContext _context;

  public ProductBulletPointRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<ProductBulletPoint?> GetById(Guid bulletPointId)
  {
    return await _context.ProductBulletPoints
      .Where(bulletPoint => bulletPoint.Id == bulletPointId)
      .FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<ProductBulletPoint?>> GetByProductId(int productId)
  {
    return await _context.ProductBulletPoints
      .Where(bulletPoint => bulletPoint.ProductId == productId)
      .ToListAsync();
  }

  public async Task<ProductBulletPoint> Add(ProductBulletPoint bulletPoint, bool saveNow = true)
  {
    var added = _context.Add(bulletPoint);
    if (saveNow) await _context.SaveChangesAsync();

    return added.Entity;
  }

  public async Task<ProductBulletPoint> Update(ProductBulletPoint bulletPoint)
  {
    var updated = _context.Update(bulletPoint);
    await _context.SaveChangesAsync();

    return updated.Entity;
  }

  public async Task Remove(ProductBulletPoint bulletPoint)
  {
    _context.Remove(bulletPoint);
    await _context.SaveChangesAsync();
  }
}