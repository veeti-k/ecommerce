using System.ComponentModel.DataAnnotations;

namespace api.Models.User;

public class Address
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid UserId { get; init; }
  [Required] public string Name { get; set; }
  [Required] public string PhoneNumber { get; set; }
  [Required] public string Email { get; set; }
  [Required] public string Line1 { get; set; }
  [Required] public string Line2 { get; set; }
  [Required] public string City { get; set; }
  [Required] public string State { get; set; }
  [Required] public string Zip { get; set; }
}