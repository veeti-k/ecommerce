using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReview.Get;

public class GetProductReviewsForProductRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
}