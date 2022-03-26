using api.Exceptions;
using api.Models.Product.Question;
using api.Models.User;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.RequestsAndResponses.ProductQuestionAnswer.Add;
using api.Security;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Products.Product.Questions;

public class CreateProductQuestionAnswer : EndpointBaseAsync
  .WithRequest<CreateProductQuestionAnswerRequest>
  .WithActionResult<ProductQuestionAnswerResponse>
{
  private readonly IMapper _mapper;
  private readonly IGenericRepo<User> _userRepo;
  private readonly IGenericRepo<Models.Product.Product> _productRepo;
  private readonly IContextService _contextService;
  private readonly IGenericRepo<ProductQuestion> _productQuestionRepo;
  private readonly IGenericRepo<ProductQuestionAnswer> _productQuestionAnswerRepo;

  public CreateProductQuestionAnswer(
    IMapper mapper,
    IGenericRepo<User> userRepo,
    IGenericRepo<Models.Product.Product> productRepo,
    IContextService contextService,
    IGenericRepo<ProductQuestion> productQuestionRepo,
    IGenericRepo<ProductQuestionAnswer> productQuestionAnswerRepo)
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
    [FromRoute] CreateProductQuestionAnswerRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);

    var product = await _productRepo.GetById(request.ProductId);
    if (product is null) throw new NotFoundException($"Product with id {request.ProductId} was not found");

    var question = await _productQuestionRepo.GetById(request.QuestionId);
    if (question is null) throw new NotFoundException($"Question with id {request.QuestionId} was not found");
    
    var isEmployee = user is not null && Flags.HasFlag(user.Flags, Flags.EMPLOYEE);

    ProductQuestionAnswer newAnswer = new()
    {
      QuestionId = question.Id,
      AnswerersNickname = request.Dto.AnswerersNickname,
      Title = request.Dto.Title,
      Content = request.Dto.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ByEmployee = isEmployee,
      IsApproved = false
    };

    var added = await _productQuestionAnswerRepo.Add(newAnswer);
    return _mapper.Map<ProductQuestionAnswerResponse>(added);
  }
}