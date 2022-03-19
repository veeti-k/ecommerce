using api.DTOs.Product;
using api.Exceptions;
using api.Mapping.MappedTypes.Product;
using api.Models;
using api.Models.Product.Question;
using api.Repositories.Interfaces;
using api.Repositories.Interfaces.ProductRepos;
using api.Security;
using api.Services.Interfaces;
using api.Services.Interfaces.ProductServices;
using AutoMapper;

namespace api.Services.ProductServices;

public class ProductQuestionAnswerService : IProductQuestionAnswerService
{
  private readonly IMapper _mapper;
  private readonly IUserRepo _userRepo;
  private readonly IProductRepo _productRepo;
  private readonly IContextService _contextService;
  private readonly IProductQuestionRepo _productQuestionRepo;
  private readonly IProductQuestionAnswerRepo _productQuestionAnswerRepo;

  public ProductQuestionAnswerService(
    IMapper aMapper,
    IUserRepo aUserRepo,
    IProductRepo aProductRepo,
    IContextService aContextService,
    IProductQuestionRepo aProductQuestionRepo,
    IProductQuestionAnswerRepo aProductQuestionAnswerRepo)
  {
    _mapper = aMapper;
    _userRepo = aUserRepo;
    _productRepo = aProductRepo;
    _contextService = aContextService;
    _productQuestionRepo = aProductQuestionRepo;
    _productQuestionAnswerRepo = aProductQuestionAnswerRepo;
  }

  public async Task<ProductQuestionAnswerResponse> CreateAnswer(
    CreateProductQuestionAnswerDTO dto,
    Guid questionId,
    int productId)
  {
    var userId = _contextService.GetCurrentUserId();
    var user = await _userRepo.GetById(userId);

    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var question = await _productQuestionRepo.GetById(questionId);
    if (question is null) throw new NotFoundException("Question not found");

    var isEmployee = user is not null && Flags.HasFlag(user.Flags, Flags.EMPLOYEE);

    ProductQuestionAnswer newAnswer = new()
    {
      AnswerersNickname = dto.AnswerersNickname,
      Title = dto.Title,
      Content = dto.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ByEmployee = isEmployee,
    };

    var added = await _productQuestionAnswerRepo.Add(newAnswer);
    return _mapper.Map<ProductQuestionAnswerResponse>(added);
  }

  public async Task RemoveAnswer(int productId, Guid questionId, Guid answerId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var question = await _productQuestionRepo.GetById(questionId);
    if (question is null) throw new NotFoundException("Question not found");

    var answer = await _productQuestionAnswerRepo.GetById(answerId);
    if (answer is null) throw new NotFoundException("Answer not found");

    await _productQuestionAnswerRepo.Remove(answer);
  }
}