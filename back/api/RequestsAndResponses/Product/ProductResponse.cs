using api.Models.Product;
using api.RequestsAndResponses.ProductBulletPoints;

namespace api.RequestsAndResponses.Product;

public record BaseProductResponse
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

public record ProductPageProductResponse : BaseProductResponse
{
  public IEnumerable<ProductBulletPointResponse> BulletPoints { get; init; }
  public IEnumerable<ProductBulletPointResponse> ImportantBulletpoints { get; init; }
  public IEnumerable<ProductCategory> Path { get; set; }
}

public record ShowCaseProductResponse : BaseProductResponse
{
  public IEnumerable<ProductBulletPointResponse> ImportantBulletpoints { get; init; }
}