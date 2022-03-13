using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Session
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid UserId { get; init; }
  [Required] public string CreatedAt { get; init; }
  [Required] public string LastUsedAt { get; init; }
}