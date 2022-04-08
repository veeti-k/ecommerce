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

public class AddProductQuestionTests : ProductQuestionIntegrationTest
{
  [Fact]
  public async Task AddProductQuestion_WithExistingProduct_AddsQuestion_ReturnsAddedQuestion()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var response = await AddProductQuestion_TEST_REQUEST(testClient, product.Id);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    json.Should().BeEquivalentTo(TestAddProductQuestionDto, options => options.ExcludingMissingMembers());
  }

  [Fact]
  public async Task AddProductQuestion_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var response = await AddProductQuestion_TEST_REQUEST(testClient, NonExistentIntId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task AddProductQuestion_AfterAdding_DoesNotExposeQuestion_UntilApproved()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var question = await AddProductQuestion(testClient, product.Id);

    var questions1 = await GetApprovedProductQuestions(testClient, product.Id);
    questions1.Any(q => q.Id == question.Id).Should().BeFalse();

    await ApproveProductQuestion(testClient, product.Id, question.Id);

    var questions2 = await GetApprovedProductQuestions(testClient, product.Id);
    questions2.Any(q => q.Id == question.Id).Should().BeTrue();
  }

  [Fact]
  public async Task AddProductQuestion_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () => AddProductQuestion_TEST_REQUEST(testClient, NonExistentIntId),
      new List<Flags> {Flags.NO_FLAGS});
  }
}