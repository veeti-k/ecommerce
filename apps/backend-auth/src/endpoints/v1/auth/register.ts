import { db } from "../../../database";
import { Endpoint, respondError, respondSuccessWithHeaders } from "shared";
import { createRefreshTokenCookie } from "../../../util/cookie";
import { hashPassword } from "../../../util/hash";
import { createAccessToken, createRefreshToken } from "../../../util/jwt";

export const register: Endpoint = async (req, res) => {
  const body = req.body;

  const existingByEmail = await db.user.get.byEmail(body.email);
  if (existingByEmail)
    return respondError({
      res,
      statusCode: 400,
      message: "Email taken",
    });

  const hashedPassword = await hashPassword(body.password);

  const result = await db.user.createUserAndSession(body, hashedPassword);

  const accessToken = createAccessToken(result.newUserId, result.newSessionId, result.newFlags);
  const refreshToken = createRefreshToken(result.newUserId, result.newSessionId, result.newFlags);

  respondSuccessWithHeaders({
    res,
    statusCode: 201,
    json: { userId: result.newUserId },
    headers: {
      accessToken: accessToken,
      refreshTokenCookie: createRefreshTokenCookie(refreshToken),
    },
    sentInfo: "register success + new user id",
  });
};
