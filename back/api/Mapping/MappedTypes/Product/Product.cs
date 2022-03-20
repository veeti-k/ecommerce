using api.Models.Product;

namespace api.Mapping.MappedTypes.Product;

public record ProductResponse
{
  public int Id { get; init; }
  public string Name { get; set; }
  public string Description { get; set; }
  public double Price { get; set; }
  public double DiscountedPrice { get; set; }
  public float DiscountPercent { get; set; }
  public double DiscountAmount { get; set; }
  public bool IsDiscounted { get; set; }
  public bool IsDeleted { get; set; }
  public float AverageStars { get; set; }
  public int ReviewCount { get; set; }
  public int QuestionCount { get; set; }
}

public record ShowCaseProductResponse : ProductResponse
{
  public IEnumerable<ProductSpecification> ImportantSpecifications { get; init; }
}