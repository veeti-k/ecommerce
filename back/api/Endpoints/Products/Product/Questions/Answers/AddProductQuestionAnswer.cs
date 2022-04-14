using api.Exceptions;
using api.Models.Question;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.RequestsAndResponses.ProductQuestionAnswer.Add;
using api.Security;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions.Answers;

public class AddProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<AddProductQuestionAnswerRequest>
  .WithActionResult<ProductQuestionAnswerResponse>
{
  private readonly IMapper _mapper;
  private readonly IUserRepo _userRepo;
  private readonly IProductRepo _productRepo;
  private readonly IContextService _contextService;
  private readonly IProductQuestionRepo _productQuestionRepo;
  private readonly IProductQuestionAnswerRepo _productQuestionAnswerRepo;

  public AddProductQuestionAnswer(
    IMapper mapper,
    IUserRepo userRepo,
    IProductRepo productRepo,
    IContextService contextService,
    IProductQuestionRepo productQuestionRepo,
    IProductQuestionAnswerRepo productQuestionAnswerRepo)
  {
    _mapper = mapper;
    _userRepo = userRepo;
    _productRepo = productRepo;
    _contextService = contextService;
    _productQuestionRepo = productQuestionRepo;
    _productQuestionAnswerRepo = productQuestionAnswerRepo;
  }

  [HttpPost(Routes.Products.Product.Questions.Quesion.AnswersRoot)]
  public override async Task<ActionResult<ProductQuestionAnswerResponse>> HandleAsync(
    [FromRoute] AddProductQuestionAnswerRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);

    var product = await _productRepo.GetOneNotDeleted(request.ProductId);
    if (product is null) throw new ProductNotFoundException(request.ProductId);

    var question = await _productQuestionRepo.GetOneApproved(request.ProductId, request.QuestionId);
    if (question is null) throw new ProductQuestionNotFoundException(request.QuestionId);
    
    var isEmployee = user is not null && user.Flags.HasFlag(Flags.EMPLOYEE);

    ProductQuestionAnswer newAnswer = new()
    {
      QuestionId = question.ProductQuestionId,
      AnswerersNickname = request.Body.AnswerersNickname,
      Title = request.Body.Title,
      Content = request.Body.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ByEmployee = isEmployee,
      IsApproved = false
    };

    var added = await _productQuestionAnswerRepo.Add(newAnswer);
    return Created("", _mapper.Map<ProductQuestionAnswerResponse>(added));
  }
}