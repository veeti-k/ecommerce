using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Questions;

public class GetApprovedProductQuestions : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<ProductQuestionResponseWithProuduct>
{
  private readonly IMapper _mapper;
  private readonly IProductQuestionRepo _productQuestionRepo;

  public GetApprovedProductQuestions(IMapper mapper, IProductQuestionRepo productQuestionRepo)
  {
    _mapper = mapper;
    _productQuestionRepo = productQuestionRepo;
  }

  [HttpGet(Routes.Products.ApprovedQuestions)]
  public override async Task<ActionResult<ProductQuestionResponseWithProuduct>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var questions = await _productQuestionRepo.GetAllApprovedWithProduct();

    return _mapper.Map<ProductQuestionResponseWithProuduct>(questions);
  }
}