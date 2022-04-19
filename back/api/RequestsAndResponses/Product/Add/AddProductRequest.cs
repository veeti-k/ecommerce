using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Product.Add;

public record BulletPointDto
{
  public Guid? Id { get; init; }
  public string Text { get; init; }
}

public record ProductImageDto
{
  public Guid? Id { get; init; }
  public string Link { get; init; }
}

public record AddProductRequestBody
{
  public string Name { get; init; }
  public string Description { get; init; }
  public string ShortDescription { get; init; }
  public double Price { get; init; }
  public double DiscountedPrice { get; init; }
  public float DiscountPercent { get; init; }
  public double DiscountAmount { get; init; }
  public bool IsDiscounted { get; init; }
  public int DeepestCategoryId { get; init; }
  public List<BulletPointDto> BulletPoints { get; init; }
  public List<ProductImageDto> ImageLinks { get; init; }
}

public class AddProductRequest
{
  [FromBody] public AddProductRequestBody Body { get; set; }
}

public class AddProductRequestValidator : AbstractValidator<AddProductRequest>
{
  public AddProductRequestValidator()
  {
    RuleFor(x => x.Body.Name).NotEmpty();
    RuleFor(x => x.Body.Description).NotEmpty();
    RuleFor(x => x.Body.ShortDescription).NotEmpty();
    RuleFor(x => x.Body.Price).NotEmpty().GreaterThan(0);

    RuleFor(x => x.Body.DeepestCategoryId).NotEmpty();
    RuleFor(x => x.Body.BulletPoints).NotEmpty();
    RuleFor(x => x.Body.ImageLinks).NotEmpty();

    RuleFor(x => x.Body.IsDiscounted).NotNull();
    When(x => x.Body.IsDiscounted, () =>
    {
      RuleFor(x => x.Body.DiscountedPrice).NotEmpty().GreaterThan(0);
      RuleFor(x => x.Body.DiscountPercent).NotEmpty().GreaterThan(0);
      RuleFor(x => x.Body.DiscountAmount).NotEmpty().GreaterThan(0);
    });
  }
}