namespace api.Mapping.MappedTypes.Product;

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
  public IEnumerable<ProductReviewCommentResponse> Comments { get; init; }
}