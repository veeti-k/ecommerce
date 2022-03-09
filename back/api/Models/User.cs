using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class User
{
  [Key] public Guid Id { get; init; }
  [Required] public string Name { get; init; }
  [Required] public string Email { get; init; }
  [Required] public string Password { get; init; }
  [Required] public string PhoneNumber { get; init; }

  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public DateTime CreatedAt { get; init; }
  
  public DateTime LastAccessedAt { get; init; }

  public virtual ICollection<Address> Addresses { get; set; }
}