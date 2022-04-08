using api.Models.Product;

namespace api.Utils;

public static class Categories
{
  public static List<ProductCategory> GetCategoryPath(IEnumerable<ProductCategory> allCategories, int deepestCategoryId)
  {
    var result = new List<ProductCategory>();

    var current = allCategories.FirstOrDefault(c => c.Id == deepestCategoryId);
    
    result.Add(current);

    while (current.ParentId != null)
    {
      current = allCategories.FirstOrDefault(c => c.Id == c.ParentId);
      result.Add(current);
    }

    return result;
  }
}