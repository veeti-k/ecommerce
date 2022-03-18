namespace api.DTOs;



public record InvalidateSessionDTO
{
  public List<Guid> SessionIds { get; init; }
}