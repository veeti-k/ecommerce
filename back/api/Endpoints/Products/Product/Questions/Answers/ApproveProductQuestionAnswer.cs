using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.RequestsAndResponses.ProductQuestionAnswer.Approve;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions.Answers;

public class ApproveProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<ApproveProductQuestionAnswerRequest>
  .WithActionResult<ProductQuestionAnswerResponse>
{
  private readonly IMapper _mapper;
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;
  private readonly IProductQuestionAnswerRepo _productQuestionAnswerRepo;

  public ApproveProductQuestionAnswer(
    IMapper mapper,
    IProductRepo productRepo,
    IProductQuestionRepo productQuestionRepo,
    IProductQuestionAnswerRepo productQuestionAnswerRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
    _productQuestionAnswerRepo = productQuestionAnswerRepo;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpPatch(Routes.Products.Product.Questions.Quesion.Answers.Answer)]
  public override async Task<ActionResult<ProductQuestionAnswerResponse>> HandleAsync(
    [FromRoute] ApproveProductQuestionAnswerRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var question = await _productQuestionRepo.GetOneApproved(request.ProductId, request.QuestionId);
    if (question is null) throw new ProductQuestionNotFoundException(request.QuestionId);

    var answer = await _productQuestionAnswerRepo.GetOne(request.QuestionId, request.AnswerId);
    if (answer is null) throw new ProductQuestionAnswerNotFoundException(request.AnswerId);

    if (answer.IsApproved)
      throw new BadRequestException("Answer is already approved");

    answer.IsApproved = true;

    var updated = await _productQuestionAnswerRepo.Update(answer);
    return _mapper.Map<ProductQuestionAnswerResponse>(updated);
  }
}