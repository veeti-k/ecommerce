using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class RemoveProductQuestionRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
}

public class RemoveProductQuestion : EndpointBaseAsync
  .WithRequest<RemoveProductQuestionRequest>
  .WithActionResult
{
  private readonly IProductQuestionService _productQuestionService;

  public RemoveProductQuestion(IProductQuestionService aProductQuestionService)
  {
    _productQuestionService = aProductQuestionService;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpDelete(Routes.Products.Product.Questions.QuestionRoot)]
  public override async Task<ActionResult> HandleAsync(RemoveProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _productQuestionService.RemoveProductQuestion(request.ProductId, request.QuestionId);

    return NoContent();
  }
}