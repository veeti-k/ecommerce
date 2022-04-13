using System.ComponentModel.DataAnnotations;

namespace api.Models.User;

public class Address
{
  [Key] public Guid AddressId { get; init; }
  [Required] public int UserId { get; init; }
  [Required] public string Name { get; set; }
  [Required] public string PhoneNumber { get; set; }
  [Required] public string Email { get; set; }
  [Required] public string StreetAddress { get; set; }
  [Required] public string City { get; set; }
  [Required] public string State { get; set; }
  [Required] public string Zip { get; set; }
}