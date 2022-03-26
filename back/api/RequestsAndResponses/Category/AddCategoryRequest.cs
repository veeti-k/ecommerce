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