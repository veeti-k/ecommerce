using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReviewComment.Approve;

public class ApproveProductReviewCommentRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
  [FromRoute(Name = "commentId")] public Guid CommentId { get; set; }
}