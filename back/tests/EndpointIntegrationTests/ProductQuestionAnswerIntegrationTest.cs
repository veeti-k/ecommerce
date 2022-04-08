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
  public static readonly AddProductQuestionAnswerDto TestAddProductQuestionAnswerDto = new()
  {
    AnswerersNickname = Guid.NewGuid().ToString(),
    Content = Guid.NewGuid().ToString(),
    Title = Guid.NewGuid().ToString()
  };

  public async Task<HttpResponseMessage?> AddQuestionAnswer_TEST_REQUEST(HttpClient testClient, int productId,
    Guid questionId)
  {
    var path = Routes.Products.Product.Questions.Quesion.AnswersRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString());

    var response = await testClient.PostAsync(path, JsonContent.Create(TestAddProductQuestionAnswerDto));

    return response;
  }

  public async Task<ProductQuestionAnswerResponse> AddQuestionAnswer(HttpClient testClient, int productId,
    Guid questionId)
  {
    var response = await AddQuestionAnswer_TEST_REQUEST(testClient, productId, questionId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionAnswerResponse>();

    return json;
  }

  // approve question answer
  public async Task<HttpResponseMessage?> ApproveQuestionAnswer_TEST_REQUEST(HttpClient testClient,
    int productId,
    Guid questionId,
    Guid answerId)
  {
    var path = Routes.Products.Product.Questions.Quesion.Answers.Answer
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString())
      .Replace(Routes.Products.AnswerId, answerId.ToString());

    var response = await testClient.PatchAsync(path, JsonContent.Create(""));

    return response;
  }

  public async Task<ProductQuestionAnswerResponse> ApproveQuestionAnswer(HttpClient testClient, int productId,
    Guid questionId, Guid answerId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(testClient, productId, questionId, answerId);

    await TestThings.Logout(testClient);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionAnswerResponse>();

    return json;
  }

  // delete question answer
  public async Task<HttpResponseMessage?> DeleteQuestionAnswer_TEST_REQUEST(HttpClient testClient, int productId,
    Guid questionId, Guid answerId)
  {
    var path = Routes.Products.Product.Questions.Quesion.Answers.Answer
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString())
      .Replace(Routes.Products.AnswerId, answerId.ToString());

    var response = await testClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteQuestionAnswer(HttpClient testClient, int productId, Guid questionId, Guid answerId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(testClient, productId, questionId, answerId);

    await TestThings.Logout(testClient);

    response.IsSuccessStatusCode.Should().BeTrue();
  }
}