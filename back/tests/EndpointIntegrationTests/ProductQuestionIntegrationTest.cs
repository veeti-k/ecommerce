using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Endpoints;
using api.RequestsAndResponses.ProductQuestion;
using api.RequestsAndResponses.ProductQuestion.Add;
using api.Security;
using FluentAssertions;

namespace tests.EndpointIntegrationTests;

public class ProductQuestionIntegrationTest : ProductIntegrationTest
{
  // add product question
  public static readonly CreateProductQuestionDto TestAddProductQuestionDto = new()
  {
    QuestionersNickname = Guid.NewGuid().ToString(),
    Content = Guid.NewGuid().ToString(),
    Title = Guid.NewGuid().ToString()
  };

  public async Task<HttpResponseMessage?> AddProductQuestion_TEST_REQUEST(HttpClient testClient, int productId)
  {
    var path = Routes.Products.Product.QuestionsRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await testClient.PostAsync(path, JsonContent.Create(TestAddProductQuestionDto));

    return response;
  }

  public async Task<ProductQuestionResponse> AddProductQuestion(HttpClient testClient, int productId)
  {
    var response = await AddProductQuestion_TEST_REQUEST(testClient, productId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    return json;
  }

  // approve question
  public async Task<HttpResponseMessage?> ApproveProductQuestion_TEST_REQUEST(HttpClient testClient, int productId,
    Guid questionId)
  {
    var path = Routes.Products.Product.Questions.QuestionRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString());

    var response = await testClient.PatchAsync(path, JsonContent.Create(""));

    return response;
  }

  public async Task<ProductQuestionResponse> ApproveProductQuestion(HttpClient testClient, int productId,
    Guid questionId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveProductQuestion_TEST_REQUEST(testClient, productId, questionId);

    await TestThings.Logout(testClient);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    return json;
  }

  // delete question
  public async Task<HttpResponseMessage?> DeleteProductQuestion_TEST_REQUEST(HttpClient testClient, int productId,
    Guid questionId)
  {
    var path = Routes.Products.Product.Questions.QuestionRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString());

    var response = await testClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteProductQuestion(HttpClient testClient, int productId, Guid questionId)
  {
    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(testClient, productId, questionId);

    await TestThings.Logout(testClient);

    response.IsSuccessStatusCode.Should().BeTrue();
  }

  // get approved questions
  public async Task<HttpResponseMessage?> GetApprovedProductQuestions_TEST_REQUEST(HttpClient testClient, int productId)
  {
    var path = Routes.Products.Product.QuestionsRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await testClient.GetAsync(path);

    return response;
  }

  public async Task<IEnumerable<ProductQuestionResponse>> GetApprovedProductQuestions(HttpClient testClient,
    int productId)
  {
    var response = await GetApprovedProductQuestions_TEST_REQUEST(testClient, productId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<IEnumerable<ProductQuestionResponse>>();

    return json;
  }
}