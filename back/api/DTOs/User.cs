using api.Models;

namespace api.DTOs;

public record UserToReturn
{
  public Guid Id { get; init; }
  public string Name { get; init; }
  public string Email { get; init; }
  public string PhoneNumber { get; init; }
  public DateTime CreatedAt { get; init; }
  public DateTime LastAccessedAt { get; init; }
  public ICollection<Address> Addresses { get; init; }
}