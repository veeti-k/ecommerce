namespace api.DTOs.Product;

public record UpdateProductDTO
{
  public string? Name { get; init; }
  public string? Description { get; init; }
  public double? Price { get; init; }
  public double? DiscountedPrice { get; init; }
  public float? DiscountPercent { get; init; }
  public double? DiscountAmount { get; init; }
  public bool? IsDiscounted { get; init; }
}

public record CreateProductDTO
{
  public string Name { get; init; }
  public string Description { get; init; }
  public double Price { get; init; }
  public double DiscountedPrice { get; init; }
  public float DiscountPercent { get; init; }
  public double DiscountAmount { get; init; }
  public bool IsDiscounted { get; init; }
}