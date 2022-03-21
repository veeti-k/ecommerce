namespace api.Mapping.MappedTypes.Product;

public record ProductBulletPointResponse
{
  public Guid Id { get; init; }
  public string Text { get; init; }
  public bool IsImportant { get; init; }
}