using api.Data;

namespace api.Specifications.Product;

public class ProductGetWithNameSpec : BaseSpec<Models.Product.Product>
{
  public ProductGetWithNameSpec(string productName)
  {
    Criteria = product => product.Name == productName;
  }
}