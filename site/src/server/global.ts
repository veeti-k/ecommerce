import { PrismaClient } from "@prisma/client";
import MeiliSearch from "meilisearch";

const moddedGlobal = global as typeof global & {
  prisma?: PrismaClient;
  meilisearch?: MeiliSearch;
};

export const prisma: PrismaClient =
  moddedGlobal.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

export const meilisearch: MeiliSearch =
  moddedGlobal.meilisearch ||
  new MeiliSearch({
    host: process.env.MEILISEARCH_HOST,
    apiKey: process.env.MEILISEARCH_API_KEY,
  });

if (process.env.NODE_ENV !== "production") {
  moddedGlobal.prisma = prisma;
  moddedGlobal.meilisearch = meilisearch;
}
