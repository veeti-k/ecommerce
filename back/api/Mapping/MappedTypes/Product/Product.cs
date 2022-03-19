
using api.Models;
using api.Models.Product;

namespace api.Mapping.MappedTypes.Product;

public record ShowCaseProductResponse
{
  public int Id { get; init; }
  public string Name { get; init; }
  public string Description { get; init; }
  public double Price { get; init; }
  public double DiscountedPrice { get; init; }
  public int DiscountPercent { get; init; }
  public bool IsDiscounted { get; init; }
  public int AverageStars { get; init; }
  public int ReviewCount { get; init; }
  public IEnumerable<ProductSpecification> ImportantSpecifications { get; init; }
}

public record ProductPageProductResponse
{
  public int Id { get; init; }
  public string Name { get; init; }
  public string Description { get; init; }
  public double Price { get; init; }
  public double DiscountedPrice { get; init; }
  public int DiscountPercent { get; init; }
  public bool IsDiscounted { get; init; }
  public int AverageStars { get; init; }
  public int ReviewCount { get; init; }
  public int QuestionCount { get; init; }
  public IEnumerable<ProductSpecification> Specifications { get; init; }
}

public record ProductCreatedResponse
{
  public int Id { get; init; }
  public string Name { get; init; }
  public string Description { get; init; }
  public double Price { get; init; }
  public double DiscountedPrice { get; init; }
  public float DiscountPercent { get; init; }
  public double DiscountAmount { get; init; }
  public bool IsDiscounted { get; init; }
}

public record ProductUpdatedResponse : ProductCreatedResponse
{
}