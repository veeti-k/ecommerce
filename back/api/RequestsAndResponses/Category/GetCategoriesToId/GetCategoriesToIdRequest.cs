using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Category.GetCategoriesToId;

public class GetCategoriesToIdRequest
{
  [FromRoute(Name = "categoryId")] public int CategoryId { get; set; } 
}

