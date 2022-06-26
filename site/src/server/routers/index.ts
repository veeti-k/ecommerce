import * as trpc from "@trpc/server";
import superjson from "superjson";

import { Context } from "../context";
import { categoryRouter } from "./category-router";

export const mainRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .merge("categories.", categoryRouter);
