using api.Models;

namespace api.RequestsAndResponses.Category;

public record ResolvedCategory
{
  public int Id { get; set; }
  public string Name { get; set; }
  public int? ParentId { get; set; }
  public List<ResolvedCategory> Children { get; set; }
}

public record CategoryResponse
{
  public int Id { get; set; }
  public string Name { get; set; }
  public int? ParentId { get; set; }
}

public record ProductCategoryResponse
{
  public List<ResolvedCategory> ResolvedCategories { get; set; }
  public List<CategoryResponse> AllCategories { get; set; }
}