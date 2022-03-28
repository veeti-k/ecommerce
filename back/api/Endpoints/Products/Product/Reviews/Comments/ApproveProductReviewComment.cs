using api.Exceptions;
using api.Models.Product.Review;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductReviewComment;
using api.RequestsAndResponses.ProductReviewComment.Approve;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Reviews.Comments;

public class ApproveProductReviewComment : EndpointBaseAsync
  .WithRequest<ApproveProductReviewCommentRequest>
  .WithActionResult<ProductReviewCommentResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductReview> _productReviewRepo;
  private readonly IGenericRepo<ProductReviewComment> _productReviewCommentRepo;

  public ApproveProductReviewComment(
    IMapper mapper,
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductReview> productReviewRepo,
    IGenericRepo<ProductReviewComment> productReviewCommentRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productReviewRepo = productReviewRepo;
    _productReviewCommentRepo = productReviewCommentRepo;
  }

  [Authorize(Policy = Policies.ManageReviews)]
  [HttpPatch(Routes.Products.Product.Reviews.Review.Comments.Comment)]
  public override async Task<ActionResult<ProductReviewCommentResponse>> HandleAsync(
    [FromRoute] ApproveProductReviewCommentRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var review = await _productReviewRepo.GetById(request.ReviewId);
    if (review is null) throw new ProductReviewNotFoundException(request.ReviewId);

    var comment = await _productReviewCommentRepo.GetById(request.CommentId);
    if (comment is null) throw new ProductReviewCommentNotFoundException(request.CommentId);

    if (comment.IsApproved)
      throw new BadRequestException("Comment is already approved");

    comment.IsApproved = true;

    var updated = await _productReviewCommentRepo.Update(comment);
    return Ok(_mapper.Map<ProductReviewCommentResponse>(updated));
  }
}