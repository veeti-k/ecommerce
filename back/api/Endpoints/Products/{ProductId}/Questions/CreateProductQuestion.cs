using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Questions;

public class CreateProductQuestionRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromBody] public CreateProductQuestionDTO Dto { get; set; }
}

public class CreateProductQuestion : EndpointBaseAsync
  .WithRequest<CreateProductQuestionRequest>
  .WithActionResult<ProductQuestionResponse>
{
  private readonly IProductQuestionService _productQuestionService;

  public CreateProductQuestion(IProductQuestionService aProductQuestionService)
  {
    _productQuestionService = aProductQuestionService;
  }

  [HttpPost(Routes.Products.Questions)]
  public override async Task<ActionResult<ProductQuestionResponse>> HandleAsync(
    CreateProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var added = await _productQuestionService.CreateQuestion(request.Dto, request.ProductId);

    return Created("", added);
  }
}