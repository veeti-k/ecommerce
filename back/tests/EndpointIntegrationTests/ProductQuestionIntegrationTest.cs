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

  public async Task<HttpResponseMessage?> AddProductQuestion_TEST_REQUEST(int productId)
  {
    var path = Routes.Products.Product.QuestionsRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await TestClient.PostAsync(path, JsonContent.Create(TestAddProductQuestionDto));

    return response;
  }

  public async Task<ProductQuestionResponse> AddProductQuestion(int productId)
  {
    var response = await AddProductQuestion_TEST_REQUEST(productId);

    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    return json;
  }
  
  // approve question
  public async Task<HttpResponseMessage?> ApproveProductQuestion_TEST_REQUEST(int productId, Guid questionId)
  {
    var path = Routes.Products.Product.Questions.QuestionRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString());

    var response = await TestClient.PatchAsync(path, JsonContent.Create(""));

    return response;
  }

  public async Task<ProductQuestionResponse> ApproveProductQuestion(int productId, Guid questionId)
  {
    await LoginAs(Flags.ADMINISTRATOR);
    
    var response = await ApproveProductQuestion_TEST_REQUEST(productId, questionId);

    await Logout();
    
    response.IsSuccessStatusCode.Should().BeTrue();

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    return json;
  }
  
  // delete question
  public async Task<HttpResponseMessage?> DeleteProductQuestion_TEST_REQUEST(int productId, Guid questionId)
  {
    var path = Routes.Products.Product.Questions.QuestionRoot
      .Replace(Routes.Products.ProductId, productId.ToString())
      .Replace(Routes.Products.QuestionId, questionId.ToString());

    var response = await TestClient.DeleteAsync(path);

    return response;
  }

  public async Task DeleteProductQuestion(int productId, Guid questionId)
  {
    await LoginAs(Flags.ADMINISTRATOR);
    
    var response = await DeleteProductQuestion_TEST_REQUEST(productId, questionId);
    
    await Logout();

    response.IsSuccessStatusCode.Should().BeTrue();
  }

  // get approved questions
  public async Task<HttpResponseMessage?> GetApprovedProductQuestions_TEST_REQUEST(int productId)
  {
    var path = Routes.Products.Product.QuestionsRoot
      .Replace(Routes.Products.ProductId, productId.ToString());

    var response = await TestClient.GetAsync(path);

    return response;
  }

  public async Task<IEnumerable<ProductQuestionResponse>> GetApprovedProductQuestions(int productId)
  {
    var response = await GetApprovedProductQuestions_TEST_REQUEST(productId);

    response.IsSuccessStatusCode.Should().BeTrue();
    
    var json = await response.Content.ReadFromJsonAsync<IEnumerable<ProductQuestionResponse>>();

    return json;
  }
}
