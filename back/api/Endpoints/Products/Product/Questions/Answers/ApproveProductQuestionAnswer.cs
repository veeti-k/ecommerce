using api.Exceptions;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.RequestsAndResponses.ProductQuestionAnswer.Approve;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class ApproveProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<ApproveProductQuestionAnswerRequest>
  .WithActionResult<ProductQuestionAnswerResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductQuestion> _productQuestionRepo;
  private readonly IGenericRepo<ProductQuestionAnswer> _productQuestionAnswerRepo;

  public ApproveProductQuestionAnswer(
    IMapper mapper,
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductQuestion> productQuestionRepo,
    IGenericRepo<ProductQuestionAnswer> productQuestionAnswerRepo)
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
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} was not found");

    var question = await _productQuestionRepo.GetById(request.QuestionId);
    if (question is null) throw new NotFoundException($"Question with id {request.QuestionId} was not found");

    var answer = await _productQuestionAnswerRepo.GetById(request.AnswerId);
    if (answer is null) throw new NotFoundException($"Answer with id {request.AnswerId} was not found");

    if (answer.IsApproved)
      throw new BadRequestException("Answer is already approved");

    answer.IsApproved = true;

    var updated = await _productQuestionAnswerRepo.Update(answer);
    return _mapper.Map<ProductQuestionAnswerResponse>(updated);
  }
}