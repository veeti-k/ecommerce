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

export const categoryRouter = createRouter()
  .query("get-all", {
    resolve: async () => {
      const categories = await meilisearch
        .index("categories")
        .search<ResolvedCategory>("*");

      return categories.hits;
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

          await meilisearch.index("categories").addDocuments([addedCategory]);

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

          await meilisearch
            .index("categories")
            .updateDocuments([editedCategory]);

          return editedCategory;
        },
      })
      .mutation("delete", {
        input: z.object({
          categoryId: z.number(),
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

          await meilisearch.index("categories").deleteDocument(categoryId);
        },
      })
  );
