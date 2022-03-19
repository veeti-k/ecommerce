using api.Mapping.MappedTypes.Product;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Questions;

public class GetProductQuestions : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult<IEnumerable<ProductQuestionResponse>>

{
  private readonly IProductQuestionService _productQuestionService;

  public GetProductQuestions(IProductQuestionService aProductQuestionService)
  {
    _productQuestionService = aProductQuestionService;
  }

  [HttpGet(Routes.Products.Questions)]
  public override async Task<ActionResult<IEnumerable<ProductQuestionResponse>>> HandleAsync(
    int productId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var questions = await _productQuestionService.GetProductQuestions(productId);

    return Ok(questions);
  }
}