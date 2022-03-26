using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductBulletPoints.Delete;

public class RemoveBulletPointRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "bulletPointId")] public Guid BulletPointId { get; set; }
}