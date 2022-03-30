using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestion.Get;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class GetProductQuestions : EndpointBaseAsync
  .WithRequest<GetProductQuestionsRequest>
  .WithActionResult<IEnumerable<ProductQuestionResponse>>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;

  public GetProductQuestions(
    IMapper mapper,
    IProductRepo productRepo,
    IProductQuestionRepo productQuestionRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
  }

  [HttpGet(Routes.Products.Product.QuestionsRoot)]
  public override async Task<ActionResult<IEnumerable<ProductQuestionResponse>>> HandleAsync(
    [FromRoute] GetProductQuestionsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var questions = await _productQuestionRepo
      .GetManyApprovedWithApprovedAnswers(request.ProductId);

    return Ok(_mapper.Map<IEnumerable<ProductQuestionResponse>>(questions));
  }
}