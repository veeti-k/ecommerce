using api.Models;
using api.RequestsAndResponses.Category;

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

  public static List<ResolvedCategory> ResolveCategories(List<ProductCategory?> categories)
  {
    var resolvedCategories = new List<ResolvedCategory>();

    var tempCategories = new List<ResolvedCategory>();
    tempCategories.AddRange(categories.Select(c => new ResolvedCategory()
    {
      Id = c.ProductCategoryId,
      Name = c.Name,
      ParentId = c.ParentId,
      Children = null
    }));

    foreach (var category in tempCategories)
    {
      if (category.ParentId is not null)
      {
        var parent = tempCategories.FirstOrDefault(c => c.Id == category.ParentId);
        if (parent == null) continue;

        parent.Children ??= new List<ResolvedCategory>();
        parent.Children.Add(category);
      }
      else
      {
        resolvedCategories.Add(category);
      }
    }

    return resolvedCategories;
  }

  public static List<int> GetRelevantCategoryIds(List<ProductCategory> categories, int deepestCategoryId)
  {
    var ids = new List<int>() {deepestCategoryId};

    var current = categories.FirstOrDefault(c => c.ProductCategoryId == deepestCategoryId);
    if (current is null) return ids;
    
    while (current?.ParentId is not null)
    {
      current = categories.FirstOrDefault(c => c.ProductCategoryId == current.ParentId);
      if (current is null) continue;

      ids.Add(current.ProductCategoryId);
    }
    
    return ids;
  }
}