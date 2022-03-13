using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class User
{
  [Key] public Guid Id { get; init; }
  [Required] public string Name { get; init; }
  [Required] public string Email { get; init; }
  [Required] public string Password { get; init; }
  public string? PhoneNumber { get; init; }
  public bool isTestAccount { get; init; }
  public string CreatedAt { get; init; }

  public virtual IEnumerable<Session> Sessions { get; init; }
  public virtual IEnumerable<Address> Addresses { get; init; }
}