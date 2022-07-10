import { ProductCategory } from "@prisma/client";
import { z } from "zod";

import {
  Flags,
  ResolvedCategory,
  addCategoryInputSchema,
  editCategoryInputSchema,
} from "@ecommerce/shared";

import { createProtectedRouter, createRouter } from "../createRouter";
import { meilisearch, prisma } from "../global";
import { resError } from "../util/resError";
import { resolveCategories } from "../util/resolveCategories";

export const categoryRouter = createRouter()
  .query("get-all-meili", {
    resolve: async () => {
      const categories = await meilisearch
        .index("categories")
        .search<ResolvedCategory>("*");

      return categories.hits;
    },
  })
  .query("get-all-db", {
    resolve: async () => {
      const categories = await prisma.productCategory.findMany();

      return categories;
    },
  })
  .query("get-with-query-db", {
    input: z.object({
      query: z.string(),
    }),
    resolve: async ({ input }) => {
      const { query } = input;

      let categories = await prisma.productCategory.findMany({
        where: {
          name: {
            contains: query,
          },
        },
      });

      categories.sort(sortByRelevance(query));

      return categories;
    },
  })
  .merge(
    createProtectedRouter({ requiredFlags: [Flags.ManageCategories] })
      .mutation("add", {
        input: addCategoryInputSchema,
        resolve: async ({ input }) => {
          const addedCategory = await prisma.productCategory.create({
            data: input,
          });

          await updateMeiliCategories();

          return addedCategory;
        },
      })
      .mutation("edit", {
        input: editCategoryInputSchema,
        resolve: async ({ input }) => {
          const { categoryId, ...rest } = input;

          const editedCategory = await prisma.productCategory.update({
            where: { id: categoryId },
            data: rest,
          });

          await updateMeiliCategories();

          return editedCategory;
        },
      })
      .mutation("delete", {
        input: z.object({
          categoryId: z.string(),
        }),
        resolve: async ({ input }) => {
          const { categoryId } = input;

          const categoryProducts = await prisma.product.findFirst({
            where: { categoryId },
          });

          if (categoryProducts)
            return resError({
              code: "BAD_REQUEST",
              message: "Category can't be deleted, because it has products",
            });

          await prisma.productCategory.delete({
            where: { id: categoryId },
          });

          await updateMeiliCategories();

          await meilisearch.index("categories").deleteDocument(categoryId);
        },
      })
  );

const updateMeiliCategories = async () => {
  const categories = await prisma.productCategory.findMany();

  const resolvedCategories = resolveCategories(categories);

  await meilisearch.index("categories").updateDocuments(resolvedCategories);
};

const sortByRelevance =
  (query: string) => (a: ProductCategory, b: ProductCategory) => {
    if (a.name.startsWith(query)) {
      return -1;
    }

    if (b.name.startsWith(query)) {
      return 1;
    }

    return 0;
  };
