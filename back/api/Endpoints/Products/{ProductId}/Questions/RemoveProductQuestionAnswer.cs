﻿using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Questions._QuestionId_.Comments._CommentId_;

public class RemoveProductQuestionAnswerRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
  [FromRoute(Name = "answerId")] public Guid AnswerId { get; set; }
}

public class RemoveProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<RemoveProductQuestionAnswerRequest>
  .WithActionResult
{
  private readonly IProductQuestionAnswerService _productQuestionAnswerService;

  public RemoveProductQuestionAnswer(IProductQuestionAnswerService aProductQuestionAnswerService)
  {
    _productQuestionAnswerService = aProductQuestionAnswerService;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpDelete(Routes.Products.QuestionAnswersAnswer)]
  public override async Task<ActionResult> HandleAsync(
    RemoveProductQuestionAnswerRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productQuestionAnswerService.RemoveAnswer(request.ProductId, request.QuestionId, request.AnswerId);

    return NoContent();
  }
}