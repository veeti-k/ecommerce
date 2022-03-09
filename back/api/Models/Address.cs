using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Address
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid UserId { get; init; }
  [Required] public string Name { get; init; }
  [Required] public string PhoneNumber { get; init; }
  [Required] public string Email { get; init; }
  [Required] public string Line1 { get; init; }
  [Required] public string Line2 { get; init; }
  [Required] public string City { get; init; }
  [Required] public string State { get; init; }
  [Required] public string ZipCode { get; init; }

  public virtual User User { get; set; }
}