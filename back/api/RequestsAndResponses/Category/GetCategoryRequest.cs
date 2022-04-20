using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Category;

public class GetCategoryRequest
{
  [FromRoute(Name = "categoryId")] public int CategoryId { get; set; }
}