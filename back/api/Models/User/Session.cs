using System.ComponentModel.DataAnnotations;

namespace api.Models.User;

public class Session
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid UserId { get; init; }
  [Required] public DateTimeOffset CreatedAt { get; init; }
  [Required] public DateTimeOffset LastUsedAt { get; set; }
}