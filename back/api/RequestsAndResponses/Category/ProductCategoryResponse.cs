namespace api.RequestsAndResponses.Category;

public record ProductCategoryResponse
{
  public int Id { get; init; }
  public string Name { get; init; }
  public int ParentId { get; init; }
}