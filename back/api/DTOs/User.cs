﻿namespace api.DTOs;

public record UpdateUserFlagsDTO
{
  public long flags { get; init; }
}

public record UpdateUserDTO
{
  public string? FirstName { get; init; }
  public string? LastName { get; init; }
  public string? Email { get; init; }
  public string? PhoneNumber { get; init; }
}