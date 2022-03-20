﻿using api.Models.Product.Review;

namespace api.Repositories.Interfaces.ProductRepos;

public interface IProductReviewRepo
{
  public Task<ProductReview?> GetById(Guid reviewId);
  public Task<IEnumerable<ProductReview?>> GetWithCommentsByProductId(int productId);
  public Task<ProductReview> Add(ProductReview productReview);
  public Task Remove(ProductReview productReview);
}