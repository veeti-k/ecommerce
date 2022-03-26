using Microsoft.AspNetCore.Mvc;

namespace api.RequestsAndResponses.ProductQuestion.Get;

public class GetProductQuestionsRequest
{
  [FromRoute(Name = "productId")] public int ProductId { get; set; }
}