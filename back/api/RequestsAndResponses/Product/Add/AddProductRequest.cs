using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Product.Add;

public record AddProductDto
{
  public string Name { get; init; }
  public string Description { get; init; }
  public double Price { get; init; }
  public double DiscountedPrice { get; init; }
  public float DiscountPercent { get; init; }
  public double DiscountAmount { get; init; }
  public bool IsDiscounted { get; init; }
  public int CategoryId { get; set; }
  public string[] BulletPoints { get; init; }
  public string[] ImageLinks { get; init; }
}

public class AddProductRequest
{
  [FromBody] public AddProductDto Dto { get; set; }
}