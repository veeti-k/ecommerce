using api.Models;

namespace api.RequestsAndResponses.Category;

public record ResolvedCategory
{
  public int Id { get; set; }
  public string Name { get; set; }
  public int? ParentId { get; set; }
  public ICollection<ResolvedCategory> Children { get; set; }
}

public record ProductCategoryResponse
{
  public ICollection<ResolvedCategory> ResolvedCategories { get; set; }
  public IEnumerable<ProductCategory> AllCategories { get; set; }
}