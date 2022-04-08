using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.ProductQuestion;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductQuestion;

public class GetQuestionTests : ProductQuestionIntegrationTest
{
  [Fact]
  public async Task GetQuestions_WithExistingProduct_WithExistingQuestions_ReturnsOnlyApprovedQuestions()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var question1 = await AddProductQuestion(testClient, product.Id);
    var question2 = await AddProductQuestion(testClient, product.Id);

    await ApproveProductQuestion(testClient, product.Id, question1.Id);

    var questions = await GetApprovedProductQuestions(testClient, product.Id);

    questions.Any(q => q.Id == question1.Id).Should().BeTrue();
    questions.Any(q => q.Id == question2.Id).Should().BeFalse();
  }

  [Fact]
  public async Task GetQuestions_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var response = await GetApprovedProductQuestions_TEST_REQUEST(testClient, NonExistentIntId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task GetQuestions_WithExistingProduct_WithoutExistingQuestions_ReturnsEmptyList()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var response = await GetApprovedProductQuestions_TEST_REQUEST(testClient, product.Id);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<IEnumerable<ProductQuestionResponse>>();

    json.Should().BeEmpty();
  }

  [Fact]
  public async Task GetQuestions_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient,
      () => GetApprovedProductQuestions_TEST_REQUEST(testClient, NonExistentIntId),
      new List<Flags> {Flags.NO_FLAGS});
  }
}