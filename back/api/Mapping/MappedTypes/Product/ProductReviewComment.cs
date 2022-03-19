namespace api.Mapping.MappedTypes.Product;

public record ProductReviewCommentResponse
{
  public Guid Id { get; init; }
  public Guid ReviewId { get; init; }
  public string CommentersNickname { get; init; }
  public bool ByEmployee { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public DateTimeOffset CreatedAt { get; init; }
  public bool IsDeleted { get; init; }
}