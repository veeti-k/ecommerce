using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductQuestion;

public class DeleteProductQuestionTests : ProductQuestionIntegrationTest
{
  [Fact]
  public async Task DeleteProductQuestion_WithApprovedExistingQuestion_DeletesQuestion_Returns204()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();


    var product = await AddProduct(testClient);
    var question = await AddProductQuestion(testClient, product.Id);
    await ApproveProductQuestion(testClient, product.Id, question.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(testClient, product.Id, question.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var questions = await GetApprovedProductQuestions(testClient, product.Id);
    questions.Any(q => q.Id == question.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteProductQuestion_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);


    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteProductQuestion_WithExistingProduct_WithNonExistentQuestion_ReturnsQuestionNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(testClient, product.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task DeleteProductQuestion_WithExistingProduct_WithNotApprovedQuestion_DeletesQuestion_Returns204()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var question = await AddProductQuestion(testClient, product.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(testClient, product.Id, question.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var questions = await GetApprovedProductQuestions(testClient, product.Id);
    questions.Any(q => q.Id == question.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteProductQuestion_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient,
      () => DeleteProductQuestion_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_QUESTIONS});
  }
}