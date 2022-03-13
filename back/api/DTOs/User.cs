using api.Models;

namespace api.DTOs;

public record UserResponse
{
  public Guid Id { get; init; }
  public string Name { get; init; }
  public string Email { get; init; }
  public string? PhoneNumber { get; init; }
  public bool isTestAccount { get; init; }
  public string CreatedAt { get; init; }
  public IEnumerable<Address> Addresses { get; init; }
}