import { Response } from "express";
import { db } from "../../../database";
import { Endpoint, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { decodeAccessToken } from "../../../util/jwt";
import { hasAccess, isEmployee } from "../../../util/authorization";

export const verify: Endpoint = async (req, res) => {
  const neededFlags = req.body.neededFlags.map((flag: number) => BigInt(flag));
  const token = req.body.token;
  const allowUnauthorized = !!req.body.allowUnauthorized;

  if (!token && !allowUnauthorized) return invalid(res);

  const result = decodeAccessToken(token);
  if (!result.isValid) return invalid(res);

  const tokenPayload = result.payload;

  const dbUser = await db.user.get.byUserIdWith.sessions(tokenPayload.userId);
  if (!dbUser) return invalid(res);

  if (dbUser.flags !== BigInt(tokenPayload.flags)) return invalid(res);
  if (!dbUser.sessions.find((s) => s.sessionId === tokenPayload.sessionId)) return invalid(res);

  if (!allowUnauthorized && !hasAccess(neededFlags, dbUser.flags)) return noAccess(res);

  const userResponse: AuthVerifyUserResponse = {
    userId: dbUser.userId,
    name: dbUser.name,
    email: dbUser.email,
    flags: Number(dbUser.flags),
    phoneNumber: dbUser.phoneNumber,
    createdAt: dbUser.createdAt,
    isEmployee: isEmployee(dbUser.flags),
    sessionId: tokenPayload.sessionId,
  };

  return respondSuccess({
    res,
    statusCode: 200,
    json: { valid: true, hasAccess: true, user: userResponse },
  });
};

const invalid = (res: Response) => res.status(200).json({ valid: false });

const noAccess = (res: Response) => res.status(200).json({ valid: true, hasAccess: false });
