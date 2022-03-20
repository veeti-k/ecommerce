using api.Mapping.MappedTypes.Product;
using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class ApproveProductQuestionRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
}

public class ApproveProductQuestion : EndpointBaseAsync
  .WithRequest<ApproveProductQuestionRequest>
  .WithActionResult<ProductQuestionResponse>
{
  private readonly IProductQuestionService _productQuestionService;

  public ApproveProductQuestion(IProductQuestionService aProductQuestionService)
  {
    _productQuestionService = aProductQuestionService;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpPatch(Routes.Products.Product.Questions.QuestionRoot)]
  public override async Task<ActionResult<ProductQuestionResponse>> HandleAsync(
    [FromRoute] ApproveProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var updated = await _productQuestionService.ApproveProductQuestion(request.ProductId, request.QuestionId);

    return Ok(updated);
  }
}