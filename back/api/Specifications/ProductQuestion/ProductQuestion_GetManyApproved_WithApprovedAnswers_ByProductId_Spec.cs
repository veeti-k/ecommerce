using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Specifications.ProductQuestion;

public class ProductQuestion_GetManyApproved_WithApprovedAnswers_ByProductId_Spec : BaseSpec<Models.Product.Question.ProductQuestion>
{
  public ProductQuestion_GetManyApproved_WithApprovedAnswers_ByProductId_Spec(int productId)
  {
    Criteria = question => question.ProductId == productId
                           && question.IsApproved;
    
    Include(questions => questions
      .Include(question => question.Answers.Where(answer => answer.IsApproved)));
  }
}