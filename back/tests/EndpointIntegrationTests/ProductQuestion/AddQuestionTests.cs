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

public class AddQuestionTests : ProductQuestionIntegrationTest
{
  [Fact]
  public async Task AddQuestion_WithExistingProduct_AddsQuestion_ReturnsAddedQuestion()
  {
    var product = await AddProduct();

    var response = await AddProductQuestion_TEST_REQUEST(product.Id);

    response.StatusCode.Should().Be(HttpStatusCode.Created);

    var json = await response.Content.ReadFromJsonAsync<ProductQuestionResponse>();

    json.Should().BeEquivalentTo(TestAddProductQuestionDto, options => options.ExcludingMissingMembers());
  }

  [Fact]
  public async Task AddQuestion_WithNonExistentProduct_ReturnsProductNotFound()
  {
    var response = await AddProductQuestion_TEST_REQUEST(NonExistentIntId);

    response.StatusCode.Should().Be(HttpStatusCode.NotFound);

    var json = await response.Content.ReadFromJsonAsync<MyExceptionResponse>();

    json.Message.Should().Be(NotFoundExceptionErrorMessages.ProductNotFoundException(NonExistentIntId));
  }

  [Fact]
  public async Task AddQuestion_AfterAdding_DoesNotExposeQuestion_UntilApproved()
  {
    var product = await AddProduct();
    var question = await AddProductQuestion(product.Id);

    var questions1 = await GetApprovedProductQuestions(product.Id);
    questions1.Any(q => q.Id == question.Id).Should().BeFalse();
    
    await ApproveProductQuestion(product.Id, question.Id);
    
    var questions2 = await GetApprovedProductQuestions(product.Id);
    questions2.Any(q => q.Id == question.Id).Should().BeTrue();
  }

  [Fact]
  public async Task AddQuestion_TestPerms()
  {
    await TestPermissions(() => AddProductQuestion_TEST_REQUEST(NonExistentIntId),
      new List<Flags>() {Flags.NO_FLAGS});
  }
}