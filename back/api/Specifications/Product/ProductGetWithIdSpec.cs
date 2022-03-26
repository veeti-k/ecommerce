using api.Data;

namespace api.Specifications.Product;

public class ProductGetWithIdSpec : BaseSpec<Models.Product.Product>
{
  public ProductGetWithIdSpec(int productId)
  {
    Criteria = product => product.Id == productId;
  }
}