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
  private readonly IProductRepo _productRepo;
  private readonly IProductQuestionRepo _productQuestionRepo;

  public ProductQuestionService(
    IMapper aMapper,
    IProductRepo aProductRepo,
    IProductQuestionRepo aProductQuestionRepo)
  {
    _mapper = aMapper;
    _productRepo = aProductRepo;
    _productQuestionRepo = aProductQuestionRepo;
  }

  public async Task<ProductQuestionResponse> CreateQuestion(CreateProductQuestionDTO dto, int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    ProductQuestion newQuestion = new()
    {
      QuestionersNickname = dto.QuestionersNickname,
      Title = dto.Title,
      Content = dto.Content,
      CreatedAt = DateTimeOffset.UtcNow,
      ProductId = product.Id,
      IsApproved = false
    };

    var added = await _productQuestionRepo.Add(newQuestion);
    return _mapper.Map<ProductQuestionResponse>(added);
  }

  public async Task<IEnumerable<ProductQuestionResponse>> GetProductQuestions(int productId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var questions = await _productQuestionRepo.GetApprovedWithAnswersByProductId(productId);
    if (!questions.Any()) throw new NotFoundException("No questions found");
     
    return _mapper.Map<IEnumerable<ProductQuestionResponse>>(questions);
  }

  public async Task<ProductQuestionResponse> ApproveProductQuestion(int productId, Guid questionId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var question = await _productQuestionRepo.GetById(questionId);
    if (question is null) throw new NotFoundException("Question not found");

    question.IsApproved = true;
    product.QuestionCount += 1;

    var updatedQuestion = await _productQuestionRepo.Update(question, false);
    await _productRepo.Update(product);

    return _mapper.Map<ProductQuestionResponse>(updatedQuestion);
  }

  public async Task RemoveProductQuestion(int productId, Guid questionId)
  {
    var product = await _productRepo.GetById(productId);
    if (product is null) throw new NotFoundException("Product not found");

    var question = await _productQuestionRepo.GetById(questionId);
    if (question is null) throw new NotFoundException("Question not found");

    await _productQuestionRepo.Remove(question);
  }
}