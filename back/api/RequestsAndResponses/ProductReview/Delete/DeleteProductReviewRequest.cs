using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReview.Delete;

public class DeleteProductReviewRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
}