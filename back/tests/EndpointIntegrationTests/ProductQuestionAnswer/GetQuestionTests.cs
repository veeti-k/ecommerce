using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductQuestionAnswer;

public class GetQuestionTests : ProductQuestionAnswerIntegrationTest
{
  [Fact]
  public async Task GetReviews_WithApprovedReviews_WithApprovedAndNotApprovedComments_ReturnsOnlyApprovedComments()
  {
    var testClient = TestThings.InitDatabaseAndCreateClient();

    var product = await AddProduct(testClient);
    var question = await AddProductQuestion(testClient, product.Id);
    await ApproveProductQuestion(testClient, product.Id, question.Id);

    var answer1 = await AddQuestionAnswer(testClient, product.Id, question.Id);
    var answer2 = await AddQuestionAnswer(testClient, product.Id, question.Id);

    await ApproveQuestionAnswer(testClient, product.Id, question.Id, answer1.Id);

    var questions = await GetApprovedProductQuestions(testClient, product.Id);

    var theReview = questions.FirstOrDefault(q => q.Id == question.Id);

    theReview.Answers.Any(a => a.Id == answer1.Id).Should().BeTrue();
    theReview.Answers.Any(a => a.Id == answer2.Id).Should().BeFalse();
  }

  // perms are already tested in ../ProductQuestion/GetQuestionTests.cs
}