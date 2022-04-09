using FluentValidation;
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
  public int DeepestCategoryId { get; init; }
  public string[] BulletPoints { get; init; }
  public string[] ImageLinks { get; init; }
}

public class AddProductRequest
{
  [FromBody] public AddProductDto Dto { get; set; }
}

public class AddProductDtoValidator : AbstractValidator<AddProductDto>
{
  public AddProductDtoValidator()
  {
    RuleFor(x => x.Name).NotEmpty();
    RuleFor(x => x.Description).NotEmpty();
    RuleFor(x => x.Price).NotEmpty().GreaterThan(0);
    
    RuleFor(x => x.DeepestCategoryId).NotEmpty();
    RuleFor(x => x.BulletPoints).NotEmpty();
    RuleFor(x => x.ImageLinks).NotEmpty();

    RuleFor(x => x.IsDiscounted).NotNull();
    When(x => x.IsDiscounted, () =>
    {
      RuleFor(x => x.DiscountedPrice).NotEmpty().GreaterThan(0);
      RuleFor(x => x.DiscountPercent).NotEmpty().GreaterThan(0);
      RuleFor(x => x.DiscountAmount).NotEmpty().GreaterThan(0);
    });
  }
}