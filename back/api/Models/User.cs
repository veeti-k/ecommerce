﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class User
{
  [Key] public Guid Id { get; init; }
  [Required] public string Name { get; init; }
  [Required] public string Email { get; init; }
  [Required] public string Password { get; init; }
  public string? PhoneNumber { get; init; }
  public bool isTestAccount { get; init; }

  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public DateTime CreatedAt { get; init; }

  public Guid TokenVersion { get; init; }
  public virtual IEnumerable<Address> Addresses { get; init; }
}