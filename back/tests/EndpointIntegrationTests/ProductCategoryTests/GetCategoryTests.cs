using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Security;
using FluentAssertions;
using Xunit;

namespace tests.EndpointIntegrationTests.ProductCategoryTests;

public class GetCategoryTests : ProductCategoryIntegrationTest
{
  [Fact]
  public async Task GetCategories_ReturnsExistingCategoriesCorrectly()
  {
    var category1 = await AddCategory();
    var category2 = await AddChildCategory(category1.Id);
    var category3 = await AddChildCategory(category1.Id);
    var category4 = await AddChildCategory(category2.Id);

    var category5 = await AddCategory();
    var category6 = await AddChildCategory(category5.Id);
    var category7 = await AddChildCategory(category6.Id);
    var category8 = await AddChildCategory(category7.Id);

    var categories = await GetCategories();

    categories.AllCategories.Should().Contain(c => c.Id == category1.Id);
    categories.AllCategories.Should().Contain(c => c.Id == category2.Id);
    categories.AllCategories.Should().Contain(c => c.Id == category3.Id);
    categories.AllCategories.Should().Contain(c => c.Id == category4.Id);
    categories.AllCategories.Should().Contain(c => c.Id == category5.Id);
    categories.AllCategories.Should().Contain(c => c.Id == category6.Id);
    categories.AllCategories.Should().Contain(c => c.Id == category7.Id);
    categories.AllCategories.Should().Contain(c => c.Id == category8.Id);

    categories.AllCategories.Should().Contain(c => c.ParentId == category1.Id);
    categories.AllCategories.Should().Contain(c => c.ParentId == category2.Id);
    categories.AllCategories.Should().Contain(c => c.ParentId == category5.Id);
    categories.AllCategories.Should().Contain(c => c.ParentId == category6.Id);
    categories.AllCategories.Should().Contain(c => c.ParentId == category7.Id);

    categories.ResolvedCategories.Should().Contain(c => c.Id == category1.Id);
    categories.ResolvedCategories.Should().Contain(c => c.Id == category5.Id);

    var category1Eq = categories.ResolvedCategories.FirstOrDefault(c => c.Id == category1.Id);
    category1Eq.Children.Should().HaveCount(2);
    category1Eq.Children.Should().Contain(c => c.Id == category2.Id);
    category1Eq.Children.Should().Contain(c => c.Id == category3.Id);

    var category2Eq = category1Eq.Children.FirstOrDefault(c => c.Id == category2.Id);
    category2Eq.Children.Should().HaveCount(1);
    category2Eq.Children.Should().Contain(c => c.Id == category4.Id);

    var category3Eq = category1Eq.Children.FirstOrDefault(c => c.Id == category3.Id);
    category3Eq.Children.Should().BeNull();

    var category4Eq = category2Eq.Children.FirstOrDefault(c => c.Id == category4.Id);
    category4Eq.Children.Should().BeNull();

    var category5Eq = categories.ResolvedCategories.FirstOrDefault(c => c.Id == category5.Id);
    category5Eq.Children.Should().HaveCount(1);
    category5Eq.Children.Should().Contain(c => c.Id == category6.Id);

    var category6Eq = category5Eq.Children.FirstOrDefault(c => c.Id == category6.Id);
    category6Eq.Children.Should().HaveCount(1);
    category6Eq.Children.Should().Contain(c => c.Id == category7.Id);

    var category7Eq = category6Eq.Children.FirstOrDefault(c => c.Id == category7.Id);
    category7Eq.Children.Should().HaveCount(1);
    category7Eq.Children.Should().Contain(c => c.Id == category8.Id);

    var category8Eq = category7Eq.Children.FirstOrDefault(c => c.Id == category8.Id);
    category8Eq.Children.Should().BeNull();
  }

  [Fact]
  public async Task GetCategories_TestPerms()
  {
    await TestPermissions(() => GetCategories_TEST_REQUEST(),
      new List<Flags>() {Flags.NO_FLAGS});
  }
}