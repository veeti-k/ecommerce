using api.RequestsAndResponses.Product.Add;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Product.Update;

public record UpdateProductRequestBody
{
  public string? Name { get; init; }
  public string? Description { get; init; }
  public double? Price { get; init; }
  public double? DiscountedPrice { get; init; }
  public float? DiscountPercent { get; init; }
  public double? DiscountAmount { get; init; }
  public bool? IsDiscounted { get; init; }
  public int? DeepestCategoryId { get; init; }
  public List<BulletPointDto> BulletPoints { get; init; }
  public List<ProductImageDto> ImageLinks { get; init; }
}

public class UpdateProductRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public UpdateProductRequestBody Body { get; set; }
}

public class UpdateProductRequestValidator : AbstractValidator<UpdateProductRequest>
{
  public UpdateProductRequestValidator()
  {
    RuleFor(x => x.Body.Price).GreaterThan(0);

    RuleFor(x => x.Body.DiscountedPrice).NotEmpty().When(x => x.Body.IsDiscounted.GetValueOrDefault());
    RuleFor(x => x.Body.DiscountPercent).NotEmpty().When(x => x.Body.IsDiscounted.GetValueOrDefault());
    RuleFor(x => x.Body.DiscountAmount).NotEmpty().When(x => x.Body.IsDiscounted.GetValueOrDefault());
  }
}