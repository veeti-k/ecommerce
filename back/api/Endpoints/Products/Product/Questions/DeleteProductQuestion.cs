using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion.Delete;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class DeleteProductQuestion : EndpointBaseAsync
  .WithRequest<RemoveProductQuestionRequest>
  .WithActionResult
{
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;
  private readonly IRevalidationService _revalidationService;

  public DeleteProductQuestion(
    IProductRepo productRepo,
    IProductQuestionRepo productQuestionRepo, 
    IRevalidationService revalidationService)
  {
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
    _revalidationService = revalidationService;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpDelete(Routes.Products.Product.Questions.QuestionRoot)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] RemoveProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var question = await _productQuestionRepo.GetOne(request.ProductId, request.QuestionId);
    if (question is null) throw new ProductQuestionNotFoundException(request.QuestionId);

    await _productQuestionRepo.Delete(question);

    var questions = await _productQuestionRepo.GetManyApproved(request.ProductId);
    product.QuestionCount = questions.Count;

    await _productRepo.Update(product);

    _revalidationService.RevalidateProduct(request.ProductId);

    return NoContent();
  }
}