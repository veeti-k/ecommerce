using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Specifications.Product;

public class ProductGetProductPageProductSpec : BaseSpec<Models.Product.Product>
{
  public ProductGetProductPageProductSpec(int productId)
  {
    Criteria = product => product.Id == productId;
    Include(products => products.Include(product => product.BulletPoints));
    Include(products => products.Include(product => product.ProductsCategories));
  }
}