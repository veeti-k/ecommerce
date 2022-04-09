using api.Models.Question;

namespace api.Repositories.Interfaces;

public interface IProductQuestionAnswerRepo : IGenericRepo<ProductQuestionAnswer>
{
  public Task<ProductQuestionAnswer?> GetOne(Guid questionId, Guid answerId);
  public Task<ProductQuestionAnswer?> GetOneApproved(Guid questionId, Guid answerId);
  public Task<IEnumerable<ProductQuestionAnswer?>> GetMany(Guid questionId);
  public Task<IEnumerable<ProductQuestionAnswer?>> GetManyApproved(Guid questionId);
}