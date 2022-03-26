using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestion.Approve;

public class ApproveProductQuestionRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
}