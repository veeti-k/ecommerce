using api.Exceptions;
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
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;
  private readonly IProductQuestionAnswerRepo _productQuestionAnswerRepo;

  public RemoveProductQuestionAnswer(
    IProductRepo productRepo,
    IProductQuestionRepo productQuestionRepo,
    IProductQuestionAnswerRepo productQuestionAnswerRepo)
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
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var question = await _productQuestionRepo.GetOneApproved(request.ProductId, request.QuestionId);
    if (question is null) throw new ProductQuestionNotFoundException(request.QuestionId);

    var answer = await _productQuestionAnswerRepo.GetOne(request.QuestionId, request.AnswerId);
    if (answer is null) throw new ProductQuestionAnswerNotFoundException(request.AnswerId);

    await _productQuestionAnswerRepo.Delete(answer);
    return NoContent();
  }
}