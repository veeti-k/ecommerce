namespace api.DTOs.Product;

public record CreateProductReviewDTO
{
  public string ReviewersNickname { get; init; }
  public string Title { get; init; }
  public string Content { get; init; }
  public int Stars { get; set; }
}