import { Response } from "express";
import { Endpoint, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { decodeAccessToken } from "../../util/jwt";
import { hasAccess, isEmployee } from "../../util/authorization";
import { db } from "database";

export const verify: Endpoint = async (req, res) => {
  const neededFlags = req.body.neededFlags.map((flag: number) => BigInt(flag));
  const token = req.body.token;
  const allowUnauthorized = !!req.body.allowUnauthorized;

  if (!token && !allowUnauthorized) return invalid(res);

  const result = decodeAccessToken(token);
  if (!result.isValid) return invalid(res);

  const tokenPayload = result.payload;

  const dbUser = await db.users.users.get.oneById(tokenPayload.userId);
  if (!dbUser) return invalid(res);

  const sessions = await db.users.sessions.get.byUserId(tokenPayload.userId);

  if (dbUser.flags !== tokenPayload.flags) return invalid(res);
  if (!sessions.find((s) => s._id === tokenPayload.sessionId)) return invalid(res);

  const userFlags = BigInt(dbUser.flags);

  if (!allowUnauthorized && !hasAccess(neededFlags, userFlags)) return noAccess(res);

  const userResponse: AuthVerifyUserResponse = {
    _id: dbUser._id,
    name: dbUser.name,
    email: dbUser.email,
    flags: String(dbUser.flags),
    phoneNumber: dbUser.phoneNumber,
    isEmployee: isEmployee(userFlags),
    sessionId: tokenPayload.sessionId,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
  };

  return respondSuccess({
    res,
    statusCode: 200,
    json: { valid: true, hasAccess: true, user: userResponse },
  });
};

const invalid = (res: Response) => res.status(200).json({ valid: false });

const noAccess = (res: Response) => res.status(200).json({ valid: true, hasAccess: false });
