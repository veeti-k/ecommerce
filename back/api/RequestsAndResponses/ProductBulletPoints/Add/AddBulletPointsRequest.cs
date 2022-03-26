using api.DTOs.Product;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductBulletPoints.Add;

public record OneProductBulletPointDtoBulletPoint
{
  public string Text { get; init; }
  public bool IsImportant { get; init; }
}

public record AddProductBulletPointDto
{
  public IEnumerable<OneProductBulletPointDtoBulletPoint> BulletPoints { get; init; }
}

public class AddBulletPointsRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public AddProductBulletPointDto Dto { get; set; }
}