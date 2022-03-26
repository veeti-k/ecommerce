using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Category;

public class RemoveCategoryRequest
{
  [FromRoute(Name = "categoryId")] public int CategoryId { get; set; }
}