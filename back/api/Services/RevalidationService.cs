using api.Configs;
using api.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace api.Services;

public class RevalidationResponse
{
  public string Message { get; init; }
}

public record RevalidationRequestBody
{
  public string Secret { get; init; }
}

public class RevalidationService : IRevalidationService
{
  private HttpClient _client;
  private Revalidation _revalidation;
  private readonly RevalidationRequestBody _requestBody;

  public RevalidationService(HttpClient client, IOptions<Revalidation> urls)
  {
    _client = client;
    _revalidation = urls.Value;
    _requestBody = new RevalidationRequestBody {Secret = _revalidation.Secret};
  }

  public async Task<RevalidationResponse> RevalidateProduct(int productId)
  {
    var path = $"{_revalidation.FrontendRevalidationBaseUrl}/products/{productId}";
    
    var response = await _client.PostAsJsonAsync(path, _requestBody);

    return await response.Content.ReadFromJsonAsync<RevalidationResponse>();
  }

  public async Task<RevalidationResponse> RevalidateProductReviewComment(int productId, Guid productReviewId,
    Guid productReviewCommentId)
  {
    var path =
      $"{_revalidation.FrontendRevalidationBaseUrl}/products/{productId}/reviews/{productReviewId}/comment/{productReviewCommentId}";

    var response = await _client.PostAsJsonAsync(path, _requestBody);

    return await response.Content.ReadFromJsonAsync<RevalidationResponse>();
  }

  public async Task<RevalidationResponse> RevalidateProductQuestionAnswer(int productId, Guid productQuestionId,
    Guid productQuestionAnswerId)
  {
    var path =
      $"{_revalidation.FrontendRevalidationBaseUrl}/products/{productId}/questions/{productQuestionId}/answer/{productQuestionAnswerId}";

    var response = await _client.PostAsJsonAsync(path, _requestBody);

    return await response.Content.ReadFromJsonAsync<RevalidationResponse>();
  }
}