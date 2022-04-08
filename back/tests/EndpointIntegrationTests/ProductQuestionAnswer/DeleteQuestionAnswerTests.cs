using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using api.Exceptions;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductQuestionAnswer;

public class DeleteQuestionAnswerTests : ProductQuestionAnswerIntegrationTest
{
  [Fact]
  public async Task
    DeleteQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithApprovedExistingAnswer_DeletesAnswer_Returns204()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var question = await AddProductQuestion(testClient, product.Id);
    await ApproveProductQuestion(testClient, product.Id, question.Id);
    var answer = await AddQuestionAnswer(testClient, product.Id, question.Id);
    await ApproveQuestionAnswer(testClient, product.Id, question.Id, answer.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(testClient, product.Id, question.Id, answer.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductQuestions(testClient, product.Id);
    var theQuestion = reviews.FirstOrDefault(foundQuestion => foundQuestion.Id == question.Id);

    theQuestion.Answers.Any(comment => comment.Id == answer.Id).Should().BeFalse();
  }

  [Fact]
  public async Task
    DeleteQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithNotApprovedExistingAnswer_DeletesAnswer_Returns204()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var question = await AddProductQuestion(testClient, product.Id);
    await ApproveProductQuestion(testClient, product.Id, question.Id);
    var answer = await AddQuestionAnswer(testClient, product.Id, question.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(testClient, product.Id, question.Id, answer.Id);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductQuestions(testClient, product.Id);
    var theQuestion = reviews.FirstOrDefault(foundQuestion => foundQuestion.Id == question.Id);

    theQuestion.Answers.Any(comment => comment.Id == answer.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteQuestionAnswer_WithExistingProduct_WithNotApprovedExistingQuestion_ReturnsQuestionNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var question = await AddProductQuestion(testClient, product.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(testClient, product.Id, question.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(question.Id));
  }

  [Fact]
  public async Task DeleteQuestionAnswer_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response =
      await DeleteQuestionAnswer_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteQuestionAnswer_WithExistingProduct_WithNonExistingQuestion_ReturnsQuestionNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);


    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response =
      await DeleteQuestionAnswer_TEST_REQUEST(testClient, product.Id, NonExistentGuidId, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    DeleteQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithoutExistingAnswer_ReturnsAnswerNotFound()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);

    var review = await AddProductQuestion(testClient, product.Id);
    await ApproveProductQuestion(testClient, product.Id, review.Id);

    await TestThings.Login(testClient, Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(testClient, product.Id, review.Id, NonExistentGuidId);

    await TestThings.Logout(testClient);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionAnswerNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task DeleteQuestionAnswer_TestPerms()
  {
    using  var testClient = TestThings.InitDatabaseAndCreateClient();

    await TestThings.TestPermissions(testClient,
      () => DeleteQuestionAnswer_TEST_REQUEST(testClient, NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_QUESTIONS}
    );
  }
}