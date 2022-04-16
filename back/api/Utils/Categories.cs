using api.Models;

namespace api.Utils;

public static class Categories
{
  public static List<ProductCategory> GetCategoryPath(List<ProductCategory> allCategories, int deepestCategoryId)
  {
    var result = new List<ProductCategory>();

    var current = allCategories.FirstOrDefault(c => c.ProductCategoryId == deepestCategoryId);
    
    result.Add(current);

    while (current?.ParentId is not null)
    {
      current = allCategories.FirstOrDefault(c => c.ProductCategoryId == current.ParentId);
      if (current is null) continue;

      result.Add(current);
    }

    result.Reverse();
    
    return result;
  }
  
  public static List<ProductCategory> GetCategoryPath(List<ProductsCategories> allCategories, int deepestCategoryId)
  {
    var result = new List<ProductCategory>();

    var current = allCategories.FirstOrDefault(c => c.ProductCategoryId == deepestCategoryId);
    
    result.Add(current.Category);

    while (current?.Category?.ParentId is not null)
    {
      current = allCategories.FirstOrDefault(c => c.ProductCategoryId == current.Category.ParentId);
      if (current is null) continue;
      
      result.Add(current.Category);
    }

    result.Reverse();
    
    return result;
  }
}