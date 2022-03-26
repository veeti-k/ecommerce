using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestionAnswer.Delete;

public class RemoveProductQuestionAnswerRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
  [FromRoute(Name = "questionId")] public Guid QuestionId { get; set; }
  [FromRoute(Name = "answerId")] public Guid AnswerId { get; set; }
}