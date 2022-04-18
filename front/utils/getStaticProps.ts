import { ResolvedCategory, Category } from "../types/Category";
import { Product, ProductPageProduct } from "../types/Product";
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
  const products = (await productRes.json()) as Product[];

  return products;
};

export const getAllProducts_STATIC_PROPS = async () => {
  const productRes = await fetch(`${apiBase}/products`);
  const products = (await productRes.json()) as Product[];

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

export const getAllApprovedReviews_STATIC_PROPS = async () => {
  const reviewRes = await fetch(`${apiBase}/products/reviews/approved`);
  const reviews = (await reviewRes.json()) as any[];

  return reviews;
};

export const getQuestions_STATIC_PROPS = async (productId: string) => {
  const questionRes = await fetch(`${apiBase}/products/${productId}/questions`);
  const questions = (await questionRes.json()) as any[];

  return questions;
};
