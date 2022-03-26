using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Product.Update;

public record UpdateProductDto 
{
  public string? Name { get; init; }
  public string? Description { get; init; }
  public double? Price { get; init; }
  public double? DiscountedPrice { get; init; }
  public float? DiscountPercent { get; init; }
  public double? DiscountAmount { get; init; }
  public bool? IsDiscounted { get; init; }
}


public class UpdateProductRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public UpdateProductDto Dto { get; set; }
}