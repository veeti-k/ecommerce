using api.Data;
using api.Models.Product;

namespace api.Specifications.Category;

public class CategoryGetWithIdSpec : BaseSpec<ProductCategory>
{
  public CategoryGetWithIdSpec(int categoryId)
  {
    Criteria = category => category.Id == categoryId;
  }
}