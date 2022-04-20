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

  public static ResolvedCategory ResolveCategory(List<ProductCategory?> categories, ProductCategory category)
  {
    var resolved = new ResolvedCategory();
    var categoryIds = new List<int>();

    var current = category;

    categoryIds.Add(current.ProductCategoryId);

    resolved.Id = current.ProductCategoryId;
    resolved.Name = current.Name;
    resolved.ParentId = current.ParentId;
    resolved.Children = null;

    var children = categories.Where(c => c.ParentId == current.ProductCategoryId).ToList();

    categoryIds.AddRange(children.Select(x => x.ProductCategoryId));

    resolved.Children = children.Select(c => ResolveCategory(categories, c)).ToList();

    return resolved;
  }

  public static List<int> GetCategoriesToId(List<ProductCategory> categories, int deepestCategoryId)
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

  public static List<ProductCategory> GetAllChildCategories(List<ProductCategory> categories, int categoryId)
  {
    var childCategories = new List<ProductCategory>() { };

    var current = categories.FirstOrDefault(c => c.ProductCategoryId == categoryId);
    if (current is null) return childCategories;

    childCategories.Add(current);

    var children = categories.Where(c => c.ParentId == current.ProductCategoryId);

    foreach (var child in children)
    {
      childCategories.Add(child);
      childCategories.AddRange(GetAllChildCategories(categories, child.ProductCategoryId));
    }

    return childCategories;
  }
}