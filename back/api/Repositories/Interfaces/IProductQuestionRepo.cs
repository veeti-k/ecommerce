#region

using api.Models.Product.Question;

#endregion

namespace api.Repositories.Interfaces;

public interface IProductQuestionRepo : IGenericRepo<ProductQuestion>
{
  public Task<ProductQuestion?> GetOne(int productId, Guid questionId);
  public Task<ProductQuestion?> GetOneApproved(int productId, Guid questionId);
  public Task<IEnumerable<ProductQuestion?>> GetMany(int productId);
  public Task<IEnumerable<ProductQuestion?>> GetManyApproved(int productId);
  public Task<IEnumerable<ProductQuestion?>> GetManyWithApprovedAnswers(int productId);
  public Task<IEnumerable<ProductQuestion?>> GetManyApprovedWithApprovedAnswers(int productId);
}