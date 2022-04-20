namespace api.RequestsAndResponses.Category.GetCategoriesToId;

public record GetCategoriesToIdResponse
{
  public List<CategoryResponse> Categories { get; init; }
  public List<int> CategoryIds { get; init; }
}