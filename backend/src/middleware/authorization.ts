import { Response } from "express";
import { Middleware } from "../types/ApiThings";
import { Flags } from "../types/Flags";
import { User } from "../types/User";
import { REQ_USER } from "../util/consts";
import { respondError } from "../util/respondWith";

const errorMissingPerms = (res: Response) =>
  respondError({ res, statusCode: 403, message: "Missing permissions" });

export const authorization =
  (...neededFlags: bigint[]): Middleware =>
  (req, res, next) => {
    const user = req.app.get(REQ_USER) as User | undefined;

    if (!user) throw new Error("No user set, did you forget to call authentication middleware?");

    if ((user.flags & Flags.Admin) === Flags.Admin) return next(); // Admin has permission to do anything

    const totalNeeded = neededFlags.reduce((acc, cur) => acc | cur);

    if ((user.flags & totalNeeded) !== totalNeeded) return errorMissingPerms(res);

    next();
  };
