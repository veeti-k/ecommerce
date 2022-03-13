using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Session
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid UserId { get; init; }
  public string LastUsedAt { get; init; }

  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public string CreatedAt { get; init; }

  public virtual User User { get; init; }
}