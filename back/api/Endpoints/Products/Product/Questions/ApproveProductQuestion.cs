using api.Exceptions;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestion.Approve;
using api.Security.Policies;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class ApproveProductQuestion : EndpointBaseAsync
  .WithRequest<ApproveProductQuestionRequest>
  .WithActionResult<ProductQuestionResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IGenericRepo<ProductQuestion> _productQuestionRepo;

  public ApproveProductQuestion(
    IMapper mapper,
    IGenericRepo<Models.Product.Product> productRepo,
    IGenericRepo<ProductQuestion> productQuestionRepo)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpPatch(Routes.Products.Product.Questions.QuestionRoot)]
  public override async Task<ActionResult<ProductQuestionResponse>> HandleAsync(
    [FromRoute] ApproveProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} was not found");

    var question = await _productQuestionRepo.GetById(request.QuestionId);
    if (question is null) throw new NotFoundException($"Question with id {request.QuestionId} was not found");

    question.IsApproved = true;
    product.QuestionCount += 1;

    var updated = await _productQuestionRepo.Update(question);
    await _productRepo.Update(product);

    return _mapper.Map<ProductQuestionResponse>(updated);
  }
}