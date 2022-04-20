import { ResolvedCategory, Category } from "../types/Category";
import { Product, ProductPageProduct } from "../types/Product";
import { ProductQuestion } from "../types/ProductQuestion";
import { ProductReview } from "../types/ProductReview";
import { apiBase } from "./consts";

export const NO_BUILD = "NO_BUILD";

export const STATIC_PROPS_REQUESTS = {
  Categories: {
    getAll: async (): Promise<Category[]> => {
      const res = await fetch(`${apiBase}/categories`);
      return (await res.json())["allCategories"] as Category[];
    },

    getAllResolved: async (): Promise<ResolvedCategory[]> => {
      const res = await fetch(`${apiBase}/categories`);
      return (await res.json())["resolvedCategories"] as ResolvedCategory[];
    },

    getById: async (categoryId: number): Promise<ResolvedCategory> => {
      const res = await fetch(`${apiBase}/categories/${categoryId}`);
      return (await res.json()) as ResolvedCategory;
    },
  },

  Products: {
    getByCategoryId: async (categoryId: number): Promise<Product[]> => {
      const res = await fetch(`${apiBase}/products?category=${categoryId}`);
      return (await res.json()) as Product[];
    },

    getById: async (productId: number): Promise<ProductPageProduct> => {
      const res = await fetch(`${apiBase}/products/${productId}`);
      return (await res.json()) as ProductPageProduct;
    },
  },

  Reviews: {
    getApprovedByProductId: async (productId: number): Promise<ProductReview[]> => {
      const res = await fetch(`${apiBase}/reviews/${productId}`);
      return await res.json();
    },

    getAllApproved: async (): Promise<ProductReview[]> => {
      const res = await fetch(`${apiBase}/products/reviews/approved`);
      return await res.json();
    },
  },

  Questions: {
    getApprovedByProductId: async (productId: number): Promise<ProductQuestion[]> => {
      const res = await fetch(`${apiBase}/products/questions/${productId}`);
      return await res.json();
    },
  },
};
