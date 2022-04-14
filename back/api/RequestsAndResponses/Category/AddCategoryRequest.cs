using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Category;

public record AddCategoryDto
{
  public string Name { get; init; }
  public int? ParentId { get; init; }
}

public record AddCategoryRequest
{
  [FromBody] public AddCategoryDto Dto { get; init; }
}

public class AddCategoryRequestValidator : AbstractValidator<AddCategoryRequest>
{
  public AddCategoryRequestValidator()
  {
    RuleFor(x => x.Dto.Name).NotEmpty();
  }
}