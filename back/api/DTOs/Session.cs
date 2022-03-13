namespace api.DTOs;

public record SessionResponse
{
  public Guid Id { get; init; }
  public Guid UserId { get; init; }
  public string CreatedAt { get; init; }
  public string LastUsedAt { get; init; }
  public bool isCurrentSession { get; set; }
}