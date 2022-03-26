namespace api.RequestsAndResponses.ProductBulletPoints;

public record ProductBulletPointResponse
{
  public Guid Id { get; init; }
  public string Text { get; init; }
}