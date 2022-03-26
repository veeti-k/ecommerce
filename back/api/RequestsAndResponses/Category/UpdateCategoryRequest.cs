using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Category;

public record UpdateCategoryDto
{
  public string? Name { get; init; }
  public int? ParentId { get; init; }
}

public class UpdateCategoryRequest
{
  [FromRoute(Name = "categoryId")] public int CategoryId { get; set; }
  [FromBody] public UpdateCategoryDto Dto { get; set; }
}