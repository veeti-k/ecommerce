﻿using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class DataContext : DbContext, IDataContext
{
  public DataContext(DbContextOptions<DataContext> aOptions) : base(aOptions)
  {
  }

  protected override void OnModelCreating(ModelBuilder aBuilder)
  {
    aBuilder.Entity<User>(entity =>
    {
      entity.HasIndex(user => user.Email).IsUnique();
      entity.HasIndex(user => user.PhoneNumber).IsUnique();
    });

    aBuilder.Entity<User>()
      .HasMany(user => user.Addresses)
      .WithOne(address => address.User)
      .HasForeignKey(address => address.UserId)
      .OnDelete(DeleteBehavior.Cascade);
  }

  public DbSet<User> Users { get; set; }
  public DbSet<Address> Addresses { get; set; }
}