using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Category;

public record UpdateCategoryBody
{
  public string Name { get; init; }
  public int? ParentId { get; init; }
}

public class UpdateCategoryRequest
{
  [FromRoute(Name = "categoryId")] public int CategoryId { get; set; }
  [FromBody] public UpdateCategoryBody Body { get; set; }
}

public class UpdateCategoryRequestValidator : AbstractValidator<UpdateCategoryRequest>
{
  public UpdateCategoryRequestValidator()
  {
    RuleFor(x => x.Body.Name).NotEmpty();
  }
}