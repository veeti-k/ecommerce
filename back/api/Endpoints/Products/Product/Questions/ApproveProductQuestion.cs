using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestion.Approve;
using api.Security.Policies;
using api.Services.Interfaces;
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
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;
  private readonly IRevalidationService _revalidationService;

  public ApproveProductQuestion(
    IMapper mapper,
    IProductRepo productRepo,
    IProductQuestionRepo productQuestionRepo, 
    IRevalidationService revalidationService)
  {
    _mapper = mapper;
    _productRepo = productRepo;
    _productQuestionRepo = productQuestionRepo;
    _revalidationService = revalidationService;
  }

  [Authorize(Policy = Policies.ManageQuestions)]
  [HttpPatch(Routes.Products.Product.Questions.QuestionRoot)]
  public override async Task<ActionResult<ProductQuestionResponse>> HandleAsync(
    [FromRoute] ApproveProductQuestionRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var question = await _productQuestionRepo.GetOne(request.ProductId, request.QuestionId);
    if (question is null) throw new ProductQuestionNotFoundException(request.QuestionId);

    if (question.IsApproved)
      throw new BadRequestException("Question is already approved");

    question.IsApproved = true;
    product.QuestionCount += 1;

    var updated = await _productQuestionRepo.Update(question);
    await _productRepo.Update(product);
    
    await _revalidationService.RevalidateProduct(request.ProductId);

    return _mapper.Map<ProductQuestionResponse>(updated);
  }
}