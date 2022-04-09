﻿using api.Models;
using api.Models.Question;
using api.Models.Review;
using api.Models.User;
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

    // one-to-many user - addresses
    aBuilder.Entity<User>()
      .HasMany(user => user.Addresses)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);

    // one-to-many user - sessions
    aBuilder.Entity<User>()
      .HasMany(user => user.Sessions)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);

    // one-to-many product - questions
    aBuilder.Entity<Product>()
      .HasMany(product => product.Questions)
      .WithOne()
      .HasForeignKey(question => question.ProductId)
      .OnDelete(DeleteBehavior.Cascade);

    // one-to-many product - bullet points
    aBuilder.Entity<Product>()
      .HasMany(product => product.BulletPoints)
      .WithOne()
      .HasForeignKey(bulletPoint => bulletPoint.ProductId)
      .OnDelete(DeleteBehavior.Cascade);

    // one-to-many question - answers
    aBuilder.Entity<ProductQuestion>()
      .HasMany(question => question.Answers)
      .WithOne()
      .HasForeignKey(answer => answer.QuestionId)
      .OnDelete(DeleteBehavior.Cascade);

    // one-to-many product - reviews
    aBuilder.Entity<Product>()
      .HasMany(product => product.Reviews)
      .WithOne()
      .HasForeignKey(review => review.ProductId)
      .OnDelete(DeleteBehavior.Cascade);

    // one-to-many review - comments
    aBuilder.Entity<ProductReview>()
      .HasMany(question => question.Comments)
      .WithOne()
      .HasForeignKey(comment => comment.ReviewId)
      .OnDelete(DeleteBehavior.Cascade);

    // many-to-many product - categories
    aBuilder.Entity<ProductsCategories>()
      .HasKey(linked => new {linked.CategoryId, linked.ProductId});

    aBuilder.Entity<ProductsCategories>()
      .HasOne<Product>()
      .WithMany(product => product.ProductsCategories)
      .HasForeignKey(pc => pc.ProductId)
      .OnDelete(DeleteBehavior.Cascade);

    aBuilder.Entity<ProductsCategories>()
      .HasOne(linked => linked.Category)
      .WithMany()
      .HasForeignKey(pc => pc.CategoryId)
      .OnDelete(DeleteBehavior.Cascade);
  }

  public DbSet<User> Users { get; set; }
  public DbSet<Address> Addresses { get; set; }
  public DbSet<Session> Sessions { get; set; }

  public DbSet<Product> Products { get; set; }
  public DbSet<ProductQuestion> ProductQuestions { get; set; }
  public DbSet<ProductQuestionAnswer> ProductQuestionAnswers { get; set; }
  public DbSet<ProductReview> ProductReviews { get; set; }
  public DbSet<ProductReviewComment> ProductReviewComments { get; set; }
  public DbSet<ProductCategory> ProductCategories { get; set; }
  public DbSet<ProductBulletPoint> ProductBulletPoints { get; set; }
  public DbSet<ProductsCategories> ProductsCategories { get; set; }
}