using api.Exceptions;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestion.Get;
using api.Specifications.ProductQuestion;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Products.Product.Questions;

public class GetProductQuestions : EndpointBaseAsync
  .WithRequest<GetProductQuestionsRequest>
  .WithActionResult<IEnumerable<ProductQuestionResponse>>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductQuestion> _productQuestionRepo;

  public GetProductQuestions(
    IMapper mapper,
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductQuestion> productQuestionRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
  }

  [HttpGet(Routes.Products.Product.QuestionsRoot)]
  public override async Task<ActionResult<IEnumerable<ProductQuestionResponse>>> HandleAsync(
    GetProductQuestionsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var questions = await _productQuestionRepo
      .Specify(new ProductQuestion_GetManyApproved_WithApprovedAnswers_ByProductId_Spec(request.ProductId))
      .ToListAsync(cancellationToken);

    return Ok(_mapper.Map<IEnumerable<ProductQuestionResponse>>(questions));
  }
}