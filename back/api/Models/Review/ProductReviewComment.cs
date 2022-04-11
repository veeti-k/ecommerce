﻿using System.ComponentModel.DataAnnotations;

namespace api.Models.Review;

public class ProductReviewComment
{
  [Key] public Guid ProductReviewCommentId { get; init; }
  [Required] public Guid ReviewId { get; init; }
  [Required] public string CommentersNickname { get; init; }
  [Required] public bool ByEmployee { get; init; }
  [Required] public string Title { get; init; }
  [Required] public string Content { get; init; }
  [Required] public bool IsApproved { get; set; }

  [Required] public DateTimeOffset CreatedAt { get; init; }
}