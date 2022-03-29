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

public class GetQuestionTests : ProductQuestionIntegrationTest
{
  [Fact]
  public async Task GetQuestions_WithExistingProduct_WithExistingQuestions_ReturnsOnlyApprovedQuestions()
  {
    var product = await AddProduct();
    var question1 = await AddProductQuestion(product.Id);
    var question2 = await AddProductQuestion(product.Id);

    await ApproveProductQuestion(product.Id, question1.Id);

    var questions = await GetApprovedProductQuestions(product.Id);

    questions.Any(q => q.Id == question1.Id).Should().BeTrue();
    questions.Any(q => q.Id == question2.Id).Should().BeFalse();
  }

  [Fact]
  public async Task GetQuestions_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var response = await GetApprovedProductQuestions_TEST_REQUEST(NonExistentIntId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task GetQuestions_WithExistingProduct_WithoutExistingQuestions_ReturnsEmptyList()
  {
    var product = await AddProduct();

    var response = await GetApprovedProductQuestions_TEST_REQUEST(product.Id);

    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var json = await response.Content.ReadFromJsonAsync<IEnumerable<ProductQuestionResponse>>();

    json.Should().BeEmpty();
  }

  [Fact]
  public async Task GetQuestions_TestPerms()
  {
    await TestPermissions(() => GetApprovedProductQuestions_TEST_REQUEST(NonExistentIntId),
      new List<Flags> {Flags.NO_FLAGS});
  }
}