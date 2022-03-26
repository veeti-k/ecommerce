using api.DTOs.Product;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductBulletPoints.Update;

public record UpdateProductBulletPointDto : OneProductBulletPointDTOBulletPoint
{
  public bool? IsImportant { get; init; }
}

public class UpdateBulletPointRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "bulletPointId")] public Guid BulletPointId { get; set; }
  [FromBody] public UpdateProductBulletPointDto Dto { get; set; }
}