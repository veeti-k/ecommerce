﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Security;

namespace api.Models.User;

public class User
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; init; }

  [Required] public string Name { get; set; }
  [Required] public string Email { get; set; }
  [Required] public string Password { get; set; }
  public string? PhoneNumber { get; set; }
  [Required] public Flags Flags { get; set; }
  [Required] public DateTimeOffset CreatedAt { get; init; }

  public virtual IEnumerable<Session> Sessions { get; init; }
  public virtual IEnumerable<Address> Addresses { get; init; }
}