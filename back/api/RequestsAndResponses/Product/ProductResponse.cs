using api.RequestsAndResponses.Category;

namespace api.RequestsAndResponses.Product;

public record ProductBulletPointResponse
{
  public Guid Id { get; init; }
  public string Text { get; init; }
}

public record ProductImageResponse
{
  public Guid Id { get; init; }
  public string Link { get; init; }
}

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
  public int DeepestCategoryId { get; set; }
  public List<ProductBulletPointResponse> BulletPoints { get; set; }
  public List<ProductImageResponse> Images { get; set; }
}

public record ProductPageProductResponse : BaseProductResponse
{
  public List<CategoryResponse> Path { get; set; }
}