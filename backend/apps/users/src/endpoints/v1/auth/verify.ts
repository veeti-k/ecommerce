import { Response } from "express";
import { db } from "../../../database";
import { Endpoint, Flags, AuthVerifyUserResponse, respondSuccess } from "shared";
import { decodeAccessToken } from "../../../util/jwt";
import { hasFlags } from "../../../util/authorization";

export const verify: Endpoint = async (req, res) => {
  const neededFlags = req.body.neededFlags.map((flag: number) => BigInt(flag));
  const token = req.body.token;
  if (!token) return invalid(res);

  const result = decodeAccessToken(token);
  if (!result.isValid) return invalid(res);

  const tokenPayload = result.payload;

  const dbUser = await db.user.get.byUserIdWith.sessions(tokenPayload.userId);
  if (!dbUser) return invalid(res);

  if (dbUser.flags !== BigInt(tokenPayload.flags)) return invalid(res);
  if (!dbUser.sessions.find((s) => s.sessionId === tokenPayload.sessionId)) return invalid(res);

  const hasAccess = hasFlags(neededFlags, dbUser.flags);
  if (!hasAccess) return noAccess(res);

  const isEmployee = hasFlags([Flags.Employee], dbUser.flags);

  const userResponse: AuthVerifyUserResponse = {
    userId: dbUser.userId,
    name: dbUser.name,
    email: dbUser.email,
    flags: Number(dbUser.flags),
    phoneNumber: dbUser.phoneNumber,
    createdAt: dbUser.createdAt,
    isEmployee,
  };

  return respondSuccess({
    res,
    statusCode: 200,
    json: { valid: true, hasAccess: true, user: userResponse },
  });
};

const invalid = (res: Response) => res.status(200).json({ valid: false });

const noAccess = (res: Response) => res.status(200).json({ valid: true, hasAccess: false });
