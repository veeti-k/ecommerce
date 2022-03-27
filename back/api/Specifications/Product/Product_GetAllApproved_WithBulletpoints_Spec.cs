using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Specifications.Product;

public class Product_GetAllApproved_WithBulletpoints_Spec : BaseSpec<Models.Product.Product>
{
  public Product_GetAllApproved_WithBulletpoints_Spec()
  {
    Criteria = product => product.IsDeleted!;
    Include(products => products
      .Include(product => product.BulletPoints));
  }
}