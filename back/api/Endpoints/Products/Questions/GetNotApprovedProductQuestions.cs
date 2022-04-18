using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Questions;

public class GetNotApprovedProductQuestions : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<NotApprovedProductQuestionResponse>
{
  private readonly IMapper _mapper;
  private readonly IProductQuestionRepo _productQuestionRepo;

  public GetNotApprovedProductQuestions(IMapper mapper, IProductQuestionRepo productQuestionRepo)
  {
    _mapper = mapper;
    _productQuestionRepo = productQuestionRepo;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpGet(Routes.Products.QuestionsRoot)]
  public override async Task<ActionResult<NotApprovedProductQuestionResponse>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var notApprovedQuestions = await _productQuestionRepo.GetNotApproved();

    return Ok(_mapper.Map<List<NotApprovedProductQuestionResponse>>(notApprovedQuestions));
  }
}