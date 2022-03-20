using api.Mapping.MappedTypes.Product;
using api.Security.Policies;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class ApproveProductQuestionAnswerRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
  [FromRoute(Name = "answerId")] public Guid AnswerId { get; set; }
}

public class ApproveProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<ApproveProductQuestionAnswerRequest>
  .WithActionResult<ProductQuestionAnswerResponse>
{
  private readonly IProductQuestionAnswerService _productQuestionAnswerService;

  public ApproveProductQuestionAnswer(IProductQuestionAnswerService aProductQuestionAnswerService)
  {
    _productQuestionAnswerService = aProductQuestionAnswerService;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpPatch(Routes.Products.Product.Questions.Quesion.Answers.Answer)]
  public override async Task<ActionResult<ProductQuestionAnswerResponse>> HandleAsync(
    [FromRoute] ApproveProductQuestionAnswerRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var updated =
      await _productQuestionAnswerService.ApproveAnswer(request.ProductId, request.QuestionId, request.AnswerId);

    return Ok(updated);
  }
}