using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReview.Approve;

public class ApproveProductReviewRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
}