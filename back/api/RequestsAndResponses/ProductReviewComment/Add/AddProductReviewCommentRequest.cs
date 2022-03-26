using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReviewComment.Add;

public class CreateProductReviewCommentDto
{
  public string CommentersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}

public class CreateProductReviewCommentRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "reviewId")] public Guid ReviewId { get; set; }
  [FromBody] public CreateProductReviewCommentDto Dto { get; set; }
}
