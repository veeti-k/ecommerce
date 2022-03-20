using api.DTOs.Product;
using api.Exceptions;
using api.Mapping.MappedTypes.Product;
using api.Models.Product.Question;
using api.Repositories.Interfaces.ProductRepos;
using api.Services.Interfaces.ProductServices;
using AutoMapper;

namespace api.Services.ProductServices;

public class ProductQuestionService : IProductQuestionService
{
  private readonly IMapper _mapper;
  private readonly IProductService _productService;
  private readonly IProductQuestionRepo _productQuestionRepo;

  public ProductQuestionService(
    IMapper aMapper,
    IProductService aProductService,
    IProductQuestionRepo aProductQuestionRepo)
  {
    _mapper = aMapper;
    _productService = aProductService;
    _productQuestionRepo = aProductQuestionRepo;
  }

  public async Task<ProductQuestionResponse> CreateQuestion(CreateProductQuestionDTO dto, int productId)
  {
    var product = await _productService.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    ProductQuestion newQuestion = new()
    {
      QuestionersNickname = dto.QuestionersNickname,
      Title = dto.Title,
      Content = dto.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ProductId = product.Id
    };

    var added = await _productQuestionRepo.Add(newQuestion);
    return _mapper.Map<ProductQuestionResponse>(added);
  }

  public async Task<IEnumerable<ProductQuestionResponse>> GetProductQuestions(int productId)
  {
    var product = await _productService.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var questions = await _productQuestionRepo.GetByProductId(productId);
    return _mapper.Map<IEnumerable<ProductQuestionResponse>>(questions);
  }

  public async Task RemoveProductQuestion(int productId, Guid questionId)
  {
    var product = await _productService.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var question = await _productQuestionRepo.GetById(questionId);
    if (question is null) throw new NotFoundException("Question not found");

    await _productQuestionRepo.Remove(question);
  }
}