using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Specifications.Product;

public class ProductGetAllSpec : BaseSpec<Models.Product.Product>
{
  public ProductGetAllSpec()
  {
    Include(products => products
      .Include(product => product.BulletPoints));
  }
}