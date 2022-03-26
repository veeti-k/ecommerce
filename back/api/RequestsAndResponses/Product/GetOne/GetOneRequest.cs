using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Product.GetOne;

public class GetOneRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
}