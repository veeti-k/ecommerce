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

public class AddQuestionAnswerTests : ProductQuestionAnswerIntegrationTest
{
    [Fact]
  public async Task AddQuestionAnswer_WithExistingProduct_WithApprovedExistingQuestion_ReturnsAddedQuestion()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);
    var question = await AddProductQuestion(product.Id);

    await ApproveProductQuestion(product.Id, question.Id);

    var response = await AddQuestionAnswer_TEST_REQUEST(product.Id, question.Id);
    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionAnswerResponse>();
    json.Should().BeEquivalentTo(TestAddProductQuestionAnswerRequestBody);
  }
  
  [Fact]
  public async Task AddQuestionAnswer_WithExistingProduct_WithNotApprovedExistingQuestion_ReturnsQuestionNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);
    var question = await AddProductQuestion(product.Id);

    var response = await AddQuestionAnswer_TEST_REQUEST(product.Id, question.Id);
    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();
    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(question.Id));
  }

  [Fact]
  public async Task AddQuestionAnswer_AfterAdding_DoesNotExposeQuestion_UntilApproved()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);
    var question = await AddProductQuestion(product.Id);
    await ApproveProductQuestion(product.Id, question.Id);
    var answer = await AddQuestionAnswer(product.Id, question.Id);

    var questions1 = await GetApprovedProductQuestions(product.Id);
    var theQuestion1 = questions1.FirstOrDefault(foundReview => foundReview.Id == question.Id);

    theQuestion1.Answers.Any(a => a.Id == answer.Id).Should().BeFalse();

    await ApproveQuestionAnswer(product.Id, question.Id, answer.Id);

    var questions2 = await GetApprovedProductQuestions(product.Id);
    var theQuestion2 = questions2.FirstOrDefault(foundReview => foundReview.Id == question.Id);

    theQuestion2.Answers.Any(a => a.Id == answer.Id).Should().BeTrue();
  }

  [Fact]
  public async Task AddQuestionAnswer_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var response = await AddQuestionAnswer_TEST_REQUEST(NonExistentIntId, NonExistentGuidId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task AddQuestionAnswer_WithExistingProduct_WithNonExistentReview_ReturnsQuestionNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.Id);

    var response = await AddQuestionAnswer_TEST_REQUEST(product.Id, NonExistentGuidId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task AddQuestionAnswer_TestPerms()
  {
    await TestPermissions(() => AddQuestionAnswer_TEST_REQUEST(NonExistentIntId, NonExistentGuidId),
      new List<Flags> {Flags.NO_FLAGS});
  }
}