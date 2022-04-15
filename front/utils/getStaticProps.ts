import { Category, ProductPageProduct, ResolvedCategory, ShowCaseProduct } from "../types";
import { apiBase } from "./consts";

export const getCategories_STATIC_PROPS = async () => {
  const categoryRes = await fetch(`${apiBase}/categories`);
  const categories = (await categoryRes.json())["resolvedCategories"] as ResolvedCategory[];

  return categories;
};

export const getAllCategories_STATIC_PROPS = async () => {
  const categoryRes = await fetch(`${apiBase}/categories`);
  const categories = (await categoryRes.json())["allCategories"] as Category[];

  return categories;
};

export const getIndexProducts_STATIC_PROPS = async () => {
  const productRes = await fetch(`${apiBase}/products`);
  const products = (await productRes.json()) as ShowCaseProduct[];

  return products;
};

export const getAllProducts_STATIC_PROPS = async () => {
  const productRes = await fetch(`${apiBase}/products`);
  const products = (await productRes.json()) as ShowCaseProduct[];

  return products;
};

export const getProduct_STATIC_PROPS = async (id: string) => {
  const productRes = await fetch(`${apiBase}/products/${id}`);
  const product = (await productRes.json()) as ProductPageProduct;

  return product;
};

export const getReviews_STATIC_PROPS = async (productId: string) => {
  const reviewRes = await fetch(`${apiBase}/products/${productId}/reviews`);
  const reviews = (await reviewRes.json()) as any[];

  return reviews;
};
