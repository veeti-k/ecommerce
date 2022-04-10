using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ProductBulletPointRepo : GenericRepo<ProductBulletPoint>, IProductBulletPointRepo
{
  private readonly DataContext _context;

  public ProductBulletPointRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<IEnumerable<ProductBulletPoint>> GetManyByProductId(int productId)
    => await _context.ProductBulletPoints.Where(x => x.ProductId == productId).ToListAsync();
}