using api.Exceptions;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion.Delete;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class DeleteProductQuestion : EndpointBaseAsync
  .WithRequest<RemoveProductQuestionRequest>
  .WithActionResult
{
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductQuestion> _productQuestionRepo;

  public DeleteProductQuestion(
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductQuestion> productQuestionRepo)
  {
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpDelete(Routes.Products.Product.Questions.QuestionRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var question = await _productQuestionRepo.GetById(request.QuestionId);
    if (question is null) throw new ProductQuestionNotFoundException(request.QuestionId);

    await _productQuestionRepo.Delete(question);

    return NoContent();
  }
}