using System.ComponentModel.DataAnnotations;

namespace api.Models.User;

public class User
{
  [Key] public Guid Id { get; init; }
  [Required] public string Name { get; init; }
  [Required] public string Email { get; init; }
  [Required] public string Password { get; init; }
  [Required] public string? PhoneNumber { get; init; }
  [Required] public bool isTestAccount { get; init; }
  [Required] public DateTimeOffset CreatedAt { get; init; }

  public virtual IEnumerable<Session> Sessions { get; init; }
  public virtual IEnumerable<Address> Addresses { get; init; }
}