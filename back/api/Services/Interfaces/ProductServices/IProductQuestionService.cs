using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;

namespace api.Services.Interfaces.ProductServices;

public interface IProductQuestionService
{
  public Task<ProductQuestionResponse> CreateQuestion(CreateProductQuestionDTO dto, int productId);
  public Task<IEnumerable<ProductQuestionResponse>> GetProductQuestions(int productId);
  public Task<ProductQuestionResponse> ApproveProductQuestion(int productId, Guid questionId);
  public Task RemoveProductQuestion(int productId, Guid questionId);
}