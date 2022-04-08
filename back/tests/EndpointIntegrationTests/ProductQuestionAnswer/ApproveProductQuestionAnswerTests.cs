using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.RequestsAndResponses.ProductQuestionAnswer;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductQuestionAnswer;

public class ApproveQuestionAnswerTests : ProductQuestionAnswerIntegrationTest
{
  [Fact]
  public async Task
    ApproveQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithExistingAnswer_Approves_ReturnsApprovedQuestionAnswer()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var question = await AddProductQuestion(testClient, product.Id);
    await ApproveProductQuestion(testClient, product.Id, question.Id);
    var answer = await AddQuestionAnswer(testClient, product.Id, question.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(testClient, product.Id, question.Id, answer.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionAnswerResponse>();

    json.Should().BeEquivalentTo(answer, options => options.ExcludingMissingMembers());

    var questions = await GetApprovedProductQuestions(testClient, product.Id);
    var theQuestion = questions.FirstOrDefault(review => review.Id == question.Id);
    theQuestion.Should().NotBeNull();

    theQuestion.Answers.FirstOrDefault(a => a.Id == answer.Id)
      .Should().NotBeNull()
      .And
      .BeEquivalentTo(answer);
  }

  [Fact]
  public async Task ApproveQuestionAnswer_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response =
      await ApproveQuestionAnswer_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveQuestionAnswer_WithExistingProduct_WithoutExistingQuestion_ReturnsQuestionNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response =
      await ApproveQuestionAnswer_TEST_REQUEST(testClient, product.Id, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithoutExistingAnswer_ReturnsAnswerNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var review = await AddProductQuestion(testClient, product.Id);
    await ApproveProductQuestion(testClient, product.Id, review.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(testClient, product.Id, review.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionAnswerNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveQuestionAnswer_WithExistingProduct_WithNotApprovedExistingQuestion_ReturnsQuestionNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var question = await AddProductQuestion(testClient, product.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(testClient, product.Id, question.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(question.Id));
  }

  [Fact]
  public async Task ApproveQuestionAnswer_TestPerms()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient, () =>
        ApproveQuestionAnswer_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_QUESTIONS});
  }
}