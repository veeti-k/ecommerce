﻿using api.Exceptions;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestionAnswer.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions.Answers;

public class RemoveProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<RemoveProductQuestionAnswerRequest>
  .WithActionResult
{
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductQuestion> _productQuestionRepo;
  private readonly IGenericRepo<ProductQuestionAnswer> _productQuestionAnswerRepo;

  public RemoveProductQuestionAnswer(
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductQuestion> productQuestionRepo,
    IGenericRepo<ProductQuestionAnswer> productQuestionAnswerRepo)
  {
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
    _productQuestionAnswerRepo = productQuestionAnswerRepo;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpDelete(Routes.Products.Product.Questions.Quesion.Answers.Answer)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveProductQuestionAnswerRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var question = await _productQuestionRepo.GetById(request.QuestionId);
    if (question is null) throw new ProductQuestionNotFoundException(request.QuestionId);

    var answer = await _productQuestionAnswerRepo.GetById(request.AnswerId);
    if (answer is null) throw new ProductQuestionAnswerNotFoundException(request.AnswerId);

    await _productQuestionAnswerRepo.Delete(answer);
    return NoContent();
  }
}