using api.DTOs.Product;
using api.Mapping.MappedTypes.Product;

namespace api.Services.Interfaces;

public interface IProductQuestionAnswerService
{
  public Task<ProductQuestionAnswerResponse> CreateAnswer(
    CreateProductQuestionAnswerDTO dto,
    Guid questionId,
    int productId);

  public Task RemoveAnswer(int productId, Guid questionId, Guid answerId);
}