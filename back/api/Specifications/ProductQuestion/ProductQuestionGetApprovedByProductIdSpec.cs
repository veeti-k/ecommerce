using api.Data;
using Z.EntityFramework.Plus;

namespace api.Specifications.ProductQuestion;

public class ProductQuestionGetApprovedByProductIdSpec : BaseSpec<Models.Product.Question.ProductQuestion>
{
  public ProductQuestionGetApprovedByProductIdSpec(int productId)
  {
    Criteria = question => question.ProductId == productId;
    Include(questions => questions
      .IncludeFilter(question => question.Answers.Where(answer => answer.IsApproved)));
  }
}