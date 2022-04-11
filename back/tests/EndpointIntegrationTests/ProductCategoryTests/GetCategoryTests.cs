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
    var category2 = await AddChildCategory(category1.ProductCategoryId);
    var category3 = await AddChildCategory(category1.ProductCategoryId);
    var category4 = await AddChildCategory(category2.ProductCategoryId);

    var category5 = await AddCategory();
    var category6 = await AddChildCategory(category5.ProductCategoryId);
    var category7 = await AddChildCategory(category6.ProductCategoryId);
    var category8 = await AddChildCategory(category7.ProductCategoryId);

    var categories = await GetCategories();

    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category1.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category2.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category3.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category4.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category5.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category6.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category7.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ProductCategoryId == category8.ProductCategoryId);

    categories.AllCategories.Should().Contain(c => c.ParentId == category1.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ParentId == category2.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ParentId == category5.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ParentId == category6.ProductCategoryId);
    categories.AllCategories.Should().Contain(c => c.ParentId == category7.ProductCategoryId);

    categories.ResolvedCategories.Should().Contain(c => c.Id == category1.ProductCategoryId);
    categories.ResolvedCategories.Should().Contain(c => c.Id == category5.ProductCategoryId);

    var category1Eq = categories.ResolvedCategories.FirstOrDefault(c => c.Id == category1.ProductCategoryId);
    category1Eq.Children.Should().HaveCount(2);
    category1Eq.Children.Should().Contain(c => c.Id == category2.ProductCategoryId);
    category1Eq.Children.Should().Contain(c => c.Id == category3.ProductCategoryId);

    var category2Eq = category1Eq.Children.FirstOrDefault(c => c.Id == category2.ProductCategoryId);
    category2Eq.Children.Should().HaveCount(1);
    category2Eq.Children.Should().Contain(c => c.Id == category4.ProductCategoryId);

    var category3Eq = category1Eq.Children.FirstOrDefault(c => c.Id == category3.ProductCategoryId);
    category3Eq.Children.Should().BeNull();

    var category4Eq = category2Eq.Children.FirstOrDefault(c => c.Id == category4.ProductCategoryId);
    category4Eq.Children.Should().BeNull();

    var category5Eq = categories.ResolvedCategories.FirstOrDefault(c => c.Id == category5.ProductCategoryId);
    category5Eq.Children.Should().HaveCount(1);
    category5Eq.Children.Should().Contain(c => c.Id == category6.ProductCategoryId);

    var category6Eq = category5Eq.Children.FirstOrDefault(c => c.Id == category6.ProductCategoryId);
    category6Eq.Children.Should().HaveCount(1);
    category6Eq.Children.Should().Contain(c => c.Id == category7.ProductCategoryId);

    var category7Eq = category6Eq.Children.FirstOrDefault(c => c.Id == category7.ProductCategoryId);
    category7Eq.Children.Should().HaveCount(1);
    category7Eq.Children.Should().Contain(c => c.Id == category8.ProductCategoryId);

    var category8Eq = category7Eq.Children.FirstOrDefault(c => c.Id == category8.ProductCategoryId);
    category8Eq.Children.Should().BeNull();
  }

  [Fact]
  public async Task GetCategories_TestPerms()
  {
    await TestPermissions(() => GetCategories_TEST_REQUEST(),
      new List<Flags>() {Flags.NO_FLAGS});
  }
}