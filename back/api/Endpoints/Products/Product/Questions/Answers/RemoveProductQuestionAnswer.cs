using api.Exceptions;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestionAnswer.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

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
    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} was not found");

    var question = await _productQuestionRepo.GetById(request.QuestionId);
    if (question is null) throw new NotFoundException($"Question with id {request.QuestionId} was not found");

    var answer = await _productQuestionAnswerRepo.GetById(request.AnswerId);
    if (answer is null) throw new NotFoundException($"Answer with id {request.AnswerId} was not found");

    await _productQuestionAnswerRepo.Delete(answer);
    return NoContent();
  }
}