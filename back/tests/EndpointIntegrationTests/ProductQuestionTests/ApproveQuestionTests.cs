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

namespace tests.EndpointIntegrationTests.ProductQuestionTests;

public class ApproveProductQuestionTests : ProductQuestionIntegrationTest
{
  [Fact]
  public async Task ApproveProductQuestion_WithExistingProduct_WithExistingQuestion_ApprovesReview_ReturnsApprovedReview()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);
    var question = await AddProductQuestion(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveProductQuestion_TEST_REQUEST(product.Id, question.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    json.Should().BeEquivalentTo(TestAddProductQuestionDto);

    var questions = await GetApprovedProductQuestions(product.Id);
    questions.Any(q => q.Id == question.Id).Should().BeTrue();
  }

  [Fact]
  public async Task ApproveProductQuestion_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveProductQuestion_TEST_REQUEST(NonExistentIntId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task ApproveProductQuestion_WithExistingProduct_WithNonExistentQuestion_ReturnsQuestionNotFound()
  {
    var category = await AddCategory();
    var product = await AddProduct(category.ProductCategoryId);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await ApproveProductQuestion_TEST_REQUEST(product.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task ApproveProductQuestion_TestPerms()
  {
    await TestPermissions(() => ApproveProductQuestion_TEST_REQUEST(NonExistentIntId, NonExistentGuidId),
      new List<Flags> {Flags.MANAGE_QUESTIONS});
  }
}