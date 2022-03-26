using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.Product.Delete;

public class DeleteProductRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
}