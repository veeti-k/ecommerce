namespace api.DTOs;

public record SessionResponse
{
  public Guid Id { get; init; }
  public string CreatedAt { get; init; }
  public string LastUsedAt { get; init; }
  public bool isCurrentSession { get; set; }
}

public record InvalidateSessionDTO
{
  public List<Guid> SessionIds { get; init; }
}