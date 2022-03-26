using api.Data;
using api.Models.Product;

namespace api.Specifications.Category;

public class CategoryGetWithNameSpec : BaseSpec<ProductCategory>
{
  public CategoryGetWithNameSpec(string categoryName)
  {
    Criteria = category => category.Name == categoryName;
  }
}