﻿using api.Models;

namespace api.Repositories.Interfaces;

public interface IProductsCategoriesRepo : IGenericRepo<ProductsCategories>
{
  public Task<IEnumerable<ProductsCategories?>> GetManyByProductId(int productId);
}