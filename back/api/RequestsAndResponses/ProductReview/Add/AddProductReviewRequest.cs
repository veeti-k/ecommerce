using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductReview.Add;

public record AddProductReviewDto
{
  public string ReviewersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public int Stars { get; set; }
}

public class AddProductReviewRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public AddProductReviewDto Dto { get; set; }
}