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
    var product = await AddProduct();
    var question = await AddProductQuestion(product.Id);
    await ApproveProductQuestion(product.Id, question.Id);
    var answer = await AddQuestionAnswer(product.Id, question.Id);
    await ApproveQuestionAnswer(product.Id, question.Id, answer.Id);    

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(product.Id, question.Id, answer.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductQuestions(product.Id);
    var theQuestion = reviews.FirstOrDefault(foundQuestion => foundQuestion.Id == question.Id);

    theQuestion.Answers.Any(comment => comment.Id == answer.Id).Should().BeFalse();
  }
  
  [Fact]
  public async Task
    DeleteQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithNotApprovedExistingAnswer_DeletesAnswer_Returns204()
  {
    var product = await AddProduct();
    var question = await AddProductQuestion(product.Id);
    await ApproveProductQuestion(product.Id, question.Id);
    var answer = await AddQuestionAnswer(product.Id, question.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(product.Id, question.Id, answer.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var reviews = await GetApprovedProductQuestions(product.Id);
    var theQuestion = reviews.FirstOrDefault(foundQuestion => foundQuestion.Id == question.Id);

    theQuestion.Answers.Any(comment => comment.Id == answer.Id).Should().BeFalse();
  }
  
  [Fact]
  public async Task DeleteQuestionAnswer_WithExistingProduct_WithNotApprovedExistingQuestion_ReturnsQuestionNotFound()
  {
    var product = await AddProduct();
    var question = await AddProductQuestion(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(product.Id, question.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(question.Id));
  }

  [Fact]
  public async Task DeleteQuestionAnswer_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteQuestionAnswer_WithExistingProduct_WithNonExistingQuestion_ReturnsQuestionNotFound()
  {
    var product = await AddProduct();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(product.Id, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    DeleteQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithoutExistingAnswer_ReturnsAnswerNotFound()
  {
    var product = await AddProduct();
    var review = await AddProductQuestion(product.Id);
    await ApproveProductQuestion(product.Id, review.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteQuestionAnswer_TEST_REQUEST(product.Id, review.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionAnswerNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task DeleteQuestionAnswer_TestPerms()
  {
    await TestPermissions(
      () => DeleteQuestionAnswer_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_QUESTIONS}
    );
  }
}