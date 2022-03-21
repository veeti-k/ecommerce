namespace api.Mapping.MappedTypes.Product;

public record Base
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

public record ProductResponse : Base
{
  public IEnumerable<ProductBulletPointResponse> BulletPoints { get; init; }
}

public record ShowCaseProductResponse : Base
{
  public IEnumerable<ProductBulletPointResponse> ImportantBulletpoints { get; init; }
}