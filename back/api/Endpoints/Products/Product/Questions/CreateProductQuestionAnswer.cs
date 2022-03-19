using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces.ProductServices;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class CreateProductQuestionAnswerRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
  [FromBody] public CreateProductQuestionAnswerDTO Dto { get; set; }
}

public class CreateProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<CreateProductQuestionAnswerRequest>
  .WithActionResult<ProductQuestionAnswerResponse>
{
  private readonly IProductQuestionAnswerService _productQuestionAnswerService;

  [HttpPost(Routes.Products.QuestionAnswers)]
  public override async Task<ActionResult<ProductQuestionAnswerResponse>> HandleAsync(
    [FromRoute] CreateProductQuestionAnswerRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var created = await _productQuestionAnswerService
      .CreateAnswer(request.Dto, request.QuestionId, request.ProductId);

    return Created("", created);
  }
}