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
  private readonly HttpClient _client;
  private readonly RevalidationConfig _revalidationConfig;
  private readonly RevalidationRequestBody _requestBody;

  public RevalidationService(HttpClient client, IOptions<RevalidationConfig> urls)
  {
    _client = client;
    _revalidationConfig = urls.Value;
    _requestBody = new RevalidationRequestBody {Secret = _revalidationConfig.Secret};
  }

  public async Task<RevalidationResponse> RevalidateProduct(int productId)
  {
    var path = $"{_revalidationConfig.FrontendRevalidationBaseUrl}/products/{productId}";
    
    var response = await _client.PostAsJsonAsync(path, _requestBody);

    return await response.Content.ReadFromJsonAsync<RevalidationResponse>();
  }

  public async Task<RevalidationResponse> RevalidateProductReviewComment(int productId, Guid productReviewId,
    Guid productReviewCommentId)
  {
    var path =
      $"{_revalidationConfig.FrontendRevalidationBaseUrl}/products/{productId}/reviews/{productReviewId}/comment/{productReviewCommentId}";

    var response = await _client.PostAsJsonAsync(path, _requestBody);

    return await response.Content.ReadFromJsonAsync<RevalidationResponse>();
  }

  public async Task<RevalidationResponse> RevalidateProductQuestionAnswer(int productId, Guid productQuestionId,
    Guid productQuestionAnswerId)
  {
    var path =
      $"{_revalidationConfig.FrontendRevalidationBaseUrl}/products/{productId}/questions/{productQuestionId}/answer/{productQuestionAnswerId}";

    var response = await _client.PostAsJsonAsync(path, _requestBody);

    return await response.Content.ReadFromJsonAsync<RevalidationResponse>();
  }
}