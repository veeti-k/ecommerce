import * as trpc from "@trpc/server";

import { Flags } from "@ecommerce/shared";

import { hasPermission } from "~utils/hasPermission";

import { Context } from "./context";
import { resError } from "./util/resError";

export const createRouter = () => trpc.router<Context>();

interface Props {
  requiredFlags?: Flags[];
}

export const createProtectedRouter = ({ requiredFlags }: Props) =>
  createRouter().middleware(async ({ ctx, next }) => {
    const session = ctx.session;

    if (!session)
      return resError({ code: "UNAUTHORIZED", message: "Unauthorized" });

    if (requiredFlags && !hasPermission(session.user.flags, requiredFlags))
      return resError({
        code: "FORBIDDEN",
        message: "You don't have sufficient permissions",
      });

    return next({
      ctx: {
        ...ctx,
        session,
      },
    });
  });
