﻿using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReviewComment.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews.Comments;

public class DeleteProductReviewComment : EndpointBaseAsync
  .WithRequest<RemoveProductReviewCommentRequest>
  .WithActionResult
{
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductReview> _productReviewRepo;
  private readonly IGenericRepo<ProductReviewComment> _productReviewCommentRepo;

  public DeleteProductReviewComment(
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductReview> productReviewRepo,
    IGenericRepo<ProductReviewComment> productReviewCommentRepo)
  {
    _productRepo = productRepo;
    _productReviewRepo = productReviewRepo;
    _productReviewCommentRepo = productReviewCommentRepo;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpDelete(Routes.Products.Product.Reviews.Review.Comments.Comment)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} was not found");

    var review = await _productReviewRepo.GetById(request.ReviewId);
    if (review is null) throw new NotFoundException($"Review with id {request.ReviewId} was not found");

    var comment = await _productReviewCommentRepo.GetById(request.CommentId);
    if (comment is null) throw new NotFoundException($"Comment with id {request.CommentId} was not found");

    await _productReviewCommentRepo.Delete(comment);
    
    return NoContent();
  }
}