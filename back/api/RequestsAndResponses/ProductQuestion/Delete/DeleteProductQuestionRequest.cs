using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestion.Delete;

public class RemoveProductQuestionRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
}
