namespace api.RequestsAndResponses.Sessions;

public record SessionResponse
{
  public Guid Id { get; init; }
  public string CreatedAt { get; init; }
  public string LastUsedAt { get; init; }
  public bool isCurrentSession { get; set; }
}