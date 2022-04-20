using api.Configs;
using api.Models;
using api.RequestsAndResponses.Product.Add;
using api.Services.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Options;

namespace api.Services;

public record ZincHitsHit
{
  public string _id { get; init; }
  public ZincProduct _source { get; init; }
}

public record ZincHitsTotal
{
  public int value { get; init; }
}

public record ZincHits
{
  public double max_score { get; init; }
  public ZincHitsTotal total { get; init; }
  public List<ZincHitsHit> hits { get; init; }
}

public record ZincResponse
{
  public ZincHits hits { get; init; }
}

public class ZincProduct
{
  public int ProductId { get; init; }
  public string Name { get; init; }
  public string Description { get; init; }
  public string ShortDescription { get; init; }
  public double Price { get; init; }
  public double DiscountedPrice { get; init; }
  public float DiscountPercent { get; init; }
  public double DiscountAmount { get; init; }
  public bool IsDiscounted { get; init; }
  public bool IsDeleted { get; init; }
  public float AverageStars { get; init; }
  public int ReviewCount { get; init; }
  public int QuestionCount { get; init; }
  public int DeepestCategoryId { get; init; }
  public string BulletPoints { get; init; }
  public string ImageUrl { get; init; }
}

public record ZincProductFrom
{
  public Product Product { get; init; }
  public IEnumerable<string> BulletPoints { get; init; }
  public string ImageUrl { get; init; }
}

public class ZincService : IZincService
{
  private readonly HttpClient _client;
  private readonly IMapper _mapper;
  private readonly string _zincUrl;
  private readonly string _zincSearchUrl;

  public ZincService(HttpClient client, IOptions<ZincConfig> zincConfig, IMapper mapper)
  {
    _client = client;
    _mapper = mapper;
    _zincUrl = $"{zincConfig.Value.BaseUrl}";
    _zincSearchUrl = $"{zincConfig.Value.BaseUrl}/products/_search";
  }

  public async Task AddProduct(Product product, List<BulletPointDto> bulletPoints, string imageLink)
  {
    var zincProduct = _mapper.Map<ZincProduct>(new ZincProductFrom()
    {
      Product = product,
      BulletPoints = bulletPoints.Select(x => x.Text),
      ImageUrl = imageLink
    });

    var addPath = $"{_zincUrl}/products/document";
    await _client.PutAsJsonAsync(addPath, zincProduct);
  }

  public async Task UpdateProduct(Product product, List<BulletPointDto> bulletPoints, string imageLink)
  {
    var productId = product.ProductId;

    var zincProduct = _mapper.Map<ZincProduct>(new ZincProductFrom()
    {
      Product = product,
      BulletPoints = bulletPoints.Select(x => x.Text),
      ImageUrl = imageLink
    });

    var searchOptions = new
    {
      search_type = "querystring",
      query = new
      {
        term = $"productId:{productId}"
      },
      _source = new[] {""},
      max_results = 1
    };

    var searchResponse = await _client.PostAsJsonAsync(_zincSearchUrl, searchOptions);
    var result = await searchResponse.Content.ReadFromJsonAsync<ZincResponse>();

    var zincId = result.hits.hits[0]._id;

    var updatePath = $"{_zincUrl}/products/_doc/{zincId}";
    await _client.PutAsJsonAsync(updatePath, zincProduct);
  }

  public async Task<IEnumerable<ZincProduct>> SearchWithString(string query)
  {
    var searchOptions = new
    {
      search_type = "querystring",
      query = new
      {
        term = $"{query} {query}*"
      },
      _source = Array.Empty<string>(),
      max_results = 100_000
    };

    var searchResponse = await _client.PostAsJsonAsync(_zincSearchUrl, searchOptions);
    var result = await searchResponse.Content.ReadFromJsonAsync<ZincResponse>();

    return result.hits.hits.Select(x => x._source);
  }

  public async Task<IEnumerable<ZincProduct>> SearchWithCategoryIds(IEnumerable<int> categoryIds)
  {
    const string separator = " deepestCategoryId:";
    var searchTerm = separator + string.Join(" deepestCategoryId:", categoryIds);

    var searchOptions = new
    {
      search_type = "querystring",
      query = new
      {
        term = searchTerm
      },
      _source = Array.Empty<string>(),
      max_results = 100_000
    };

    var searchResponse = await _client.PostAsJsonAsync(_zincSearchUrl, searchOptions);
    var searchResult = await searchResponse.Content.ReadFromJsonAsync<ZincResponse>();
    
    return searchResult.hits.hits.Select(x => x._source);
  }
}