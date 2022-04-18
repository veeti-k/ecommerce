using api.RequestsAndResponses.Product;
using api.RequestsAndResponses.ProductReviewComment;

namespace api.RequestsAndResponses.ProductReview;

public record ProductReviewResponse
{
  public Guid Id { get; init; }
  public int ProductId { get; init; }
  public string ReviewersNickname { get; init; }
  public bool ByEmployee { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public int Stars { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
  public List<ProductReviewCommentResponse> Comments { get; init; }
}

public record ProductReviewResponseWithProduct : ProductReviewResponse
{
  public BaseProductResponse Product { get; init; }
}