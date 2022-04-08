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

public class ApproveProductQuestionTests : ProductQuestionIntegrationTest
{
  [Fact]
  public async Task
    ApproveProductQuestion_WithExistingProduct_WithExistingQuestion_ApprovesReview_ReturnsApprovedReview()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var question = await AddProductQuestion(testClient, product.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveProductQuestion_TEST_REQUEST(testClient, product.Id, question.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    json.Should().BeEquivalentTo(TestAddProductQuestionDto);

    var questions = await GetApprovedProductQuestions(testClient, product.Id);
    questions.Any(q => q.Id == question.Id).Should().BeTrue();
  }

  [Fact]
  public async Task ApproveProductQuestion_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveProductQuestion_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveProductQuestion_WithExistingProduct_WithNonExistentQuestion_ReturnsQuestionNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveProductQuestion_TEST_REQUEST(testClient, product.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task ApproveProductQuestion_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient,
      () => ApproveProductQuestion_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_QUESTIONS});
  }
}