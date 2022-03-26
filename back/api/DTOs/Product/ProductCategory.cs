namespace api.DTOs.Product;

public record CreateProductCategoryDTO
{
  public string Name { get; init; }
  public int? ParentId { get; init; }
}