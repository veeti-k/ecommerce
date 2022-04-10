using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Product.Update;

public record UpdateBulletPointDto
{
  public Guid? Id { get; init; }
  public string Text { get; init; }
}

public record UpdateProductImageDto
{
  public Guid? Id { get; init; }
  public string Link { get; init; }
}

public record UpdateProductDto
{
  public string? Name { get; init; }
  public string? Description { get; init; }
  public double? Price { get; init; }
  public double? DiscountedPrice { get; init; }
  public float? DiscountPercent { get; init; }
  public double? DiscountAmount { get; init; }
  public bool? IsDiscounted { get; init; }
  public int? DeepestCategoryId { get; init; }
  public IEnumerable<UpdateBulletPointDto> BulletPoints { get; init; }
  public IEnumerable<UpdateProductImageDto> ImageLinks { get; init; }
}

public class UpdateProductRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public UpdateProductDto Dto { get; set; }
}

public class UpdateProductDtoValidator : AbstractValidator<UpdateProductDto>
{
  public UpdateProductDtoValidator()
  {
    RuleFor(x => x.Price).GreaterThan(0);

    RuleFor(x => x.DiscountedPrice).NotEmpty().When(x => x.IsDiscounted.GetValueOrDefault());
    RuleFor(x => x.DiscountPercent).NotEmpty().When(x => x.IsDiscounted.GetValueOrDefault());
    RuleFor(x => x.DiscountAmount).NotEmpty().When(x => x.IsDiscounted.GetValueOrDefault());
  }
}