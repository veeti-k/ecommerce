namespace api.DTOs.Product;

public record OneProductBulletPointDTOBulletPoint
{
  public string Text { get; init; }
  public bool IsImportant { get; init; }
}

public record CreateProductBulletPointDTO
{
  public IEnumerable<OneProductBulletPointDTOBulletPoint> BulletPoints { get; init; }
}

public record UpdateProductBulletPointDTO : OneProductBulletPointDTOBulletPoint
{
  public bool? IsImportant { get; init; }
}