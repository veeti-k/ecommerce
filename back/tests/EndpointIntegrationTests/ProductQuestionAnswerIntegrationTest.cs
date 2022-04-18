using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.RequestsAndResponses.ProductQuestionAnswer.Add;
using api.Security;
using FluentAssertions;

namespace tests.EndpointIntegrationTests;

public class ProductQuestionAnswerIntegrationTest : ProductQuestionIntegrationTest
{
  // add question answer
  public static readonly AddProductQuestionAnswerRequestBody TestAddProductQuestionAnswerRequestBody = new()
  {
    AnswerersNickname = Guid.NewGuid().ToString(),
    Content = Guid.NewGuid().ToString(),
  };

  public async Task<HttpResponseMessage?> AddQuestionAnswer_TEST_REQUEST(int productId, Guid questionId)
  {
    var path = Routes.Products.Product.Questions.Quesion.AnswersRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString());

    var response = await TestClient.PostAsync(path, JsonContent.Create(TestAddProductQuestionAnswerRequestBody));

    return response;
  }

  public async Task<ProductQuestionAnswerResponse> AddQuestionAnswer(int productId, Guid questionId)
  {
    var response = await AddQuestionAnswer_TEST_REQUEST(productId, questionId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionAnswerResponse>();

    return json;
  }

  // approve question answer
  public async Task<HttpResponseMessage?> ApproveQuestionAnswer_TEST_REQUEST(
    int productId,
    Guid questionId,
    Guid answerId)
  {
    var path = Routes.Products.Product.Questions.Quesion.Answers.Answer
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString())
      .Replace(Routes.Products.AnswerId, answerId.ToString());

    var response = await TestClient.PatchAsync(path, JsonContent.Create(""));

    return response;
  }

  public async Task<ProductQuestionAnswerResponse> ApproveQuestionAnswer(int productId, Guid questionId, Guid answerId)
  {
    await LoginAs(Flags.ADMINISTRATOR);
    
    var response = await ApproveQuestionAnswer_TEST_REQUEST(productId, questionId, answerId);

    await Logout();
    
    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionAnswerResponse>();

    return json;
  }
  
  // delete question answer
  public async Task<HttpResponseMessage?> DeleteQuestionAnswer_TEST_REQUEST(int productId, Guid questionId, Guid answerId)
  {
    var path = Routes.Products.Product.Questions.Quesion.Answers.Answer
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString())
      .Replace(Routes.Products.AnswerId, answerId.ToString());

    var response = await TestClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteQuestionAnswer(int productId, Guid questionId, Guid answerId)
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(productId, questionId, answerId);

    await Logout();

    response.IsSuccessStatusCode.Should().BeTrue();
  }
}