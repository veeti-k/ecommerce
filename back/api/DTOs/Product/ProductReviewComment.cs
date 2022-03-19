namespace api.DTOs.Product;

public class CreateProductReviewCommentDTO
{
  public string CommentersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
}