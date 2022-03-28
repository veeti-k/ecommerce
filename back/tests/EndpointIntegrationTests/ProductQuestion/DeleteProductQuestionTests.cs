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
    var product = await AddProduct();
    var question = await AddProductQuestion(product.Id);
    await ApproveProductQuestion(product.Id, question.Id);

    await LoginAs(Flags.ADMINISTRATOR);
    
    var response = await DeleteProductQuestion_TEST_REQUEST(product.Id, question.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var questions = await GetApprovedProductQuestions(product.Id);
    questions.Any(q => q.Id == question.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteProductQuestion_WithNonExistentProduct_ReturnsProductNotFound()
  {
    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(NonExistentIntId, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);


    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task DeleteProductQuestion_WithExistingProduct_WithNonExistentQuestion_ReturnsQuestionNotFound()
  {
    var product = await AddProduct();

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(product.Id, NonExistentGuidId);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductQuestionNotFoundException(NonExistentGuidId));
  }

  [Fact]
  public async Task DeleteProductQuestion_WithExistingProduct_WithNotApprovedQuestion_DeletesQuestion_Returns204()
  {
    var product = await AddProduct();
    var question = await AddProductQuestion(product.Id);

    await LoginAs(Flags.ADMINISTRATOR);

    var response = await DeleteProductQuestion_TEST_REQUEST(product.Id, question.Id);

    await Logout();

    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    var questions = await GetApprovedProductQuestions(product.Id);
    questions.Any(q => q.Id == question.Id).Should().BeFalse();
  }

  [Fact]
  public async Task DeleteProductQuestion_TestPerms()
  {
    await TestPermissions(() => DeleteProductQuestion_TEST_REQUEST(NonExistentIntId, NonExistentGuidId),
      new List<Flags>() {Flags.MANAGE_QUESTIONS});
  }
}