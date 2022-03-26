using api.Data;

namespace api.Specifications.ProductQuestion;

public class ProductQuestion_GetOneApproved_ByQuestionId_Spec : BaseSpec<Models.Product.Question.ProductQuestion>
{
  public ProductQuestion_GetOneApproved_ByQuestionId_Spec(Guid productQuestionId)
  {
    Criteria = question => question.Id == productQuestionId
                           && question.IsApproved;
  }
}