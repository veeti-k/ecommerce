#region

using api.Models.Question;

#endregion

namespace api.Repositories.Interfaces;

public interface IProductQuestionRepo : IGenericRepo<ProductQuestion>
{
  public Task<ProductQuestion?> GetOne(int productId, Guid questionId);
  public Task<ProductQuestion?> GetOneApproved(int productId, Guid questionId);
  public Task<List<ProductQuestion?>> GetMany(int productId);
  public Task<List<ProductQuestion?>> GetManyApproved(int productId);
  public Task<List<ProductQuestion?>> GetManyWithApprovedAnswers(int productId);
  public Task<List<ProductQuestion?>> GetManyApprovedWithApprovedAnswers(int productId);
  public Task<List<ProductQuestion?>> GetNotApproved();
}