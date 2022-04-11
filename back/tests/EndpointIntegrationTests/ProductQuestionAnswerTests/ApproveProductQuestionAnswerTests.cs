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

namespace tests.EndpointIntegrationTests.ProductQuestionAnswerTests;

public class ApproveQuestionAnswerTests : ProductQuestionAnswerIntegrationTest
{
  [Fact]
  public async Task
    ApproveQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithExistingAnswer_Approves_ReturnsApprovedQuestionAnswer()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var question = await AddProductQuestion(product.Id);
    await ApproveProductQuestion(product.Id, question.Id);
    var answer = await AddQuestionAnswer(product.Id, question.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(product.Id, question.Id, answer.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionAnswerResponse>();

    json.Should().BeEquivalentTo(answer, options => options.ExcludingMissingMembers());

    var questions = await GetApprovedProductQuestions(product.Id);
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
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveQuestionAnswer_WithExistingProduct_WithoutExistingQuestion_ReturnsQuestionNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(product.Id, NonExistentGuidId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_WithoutExistingAnswer_ReturnsAnswerNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var review = await AddProductQuestion(product.Id);
    await ApproveProductQuestion(product.Id, review.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(product.Id, review.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionAnswerNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task
    ApproveQuestionAnswer_WithExistingProduct_WithNotApprovedExistingQuestion_ReturnsQuestionNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var question = await AddProductQuestion(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveQuestionAnswer_TEST_REQUEST(product.Id, question.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(question.Id));
  }

  [Fact]
  public async Task ApproveQuestionAnswer_TestPerms()
  {
    await TestPermissions(() =>
        ApproveQuestionAnswer_TEST_REQUEST(NonExistentIntId, NonExistentGuidId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_QUESTIONS});
  }
}