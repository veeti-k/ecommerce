import * as trpcNext from "@trpc/server/adapters/next";

import { createContext } from "../../../server/context";
import { mainRouter } from "../../../server/routers";

export type AppRouter = typeof mainRouter;

export default trpcNext.createNextApiHandler({
  router: mainRouter,
  createContext: createContext,
});
