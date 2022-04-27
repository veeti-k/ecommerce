import { db } from "../../../database";
import { Endpoint, respondError, respondSuccessWithHeaders } from "shared";
import { createRefreshTokenCookie } from "../../../util/cookie";
import { comparePassword } from "../../../util/hash";
import { createAccessToken, createRefreshToken } from "../../../util/jwt";

export const login: Endpoint = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await db.user.get.byEmail(email);
  if (!existingUser)
    return respondError({
      res,
      statusCode: 400,
      message: "User not found",
    });

  const validPass = await comparePassword(password, existingUser.password);
  if (!validPass)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid password",
    });

  const createdSession = await db.session.create(existingUser.userId);

  const accessToken = createAccessToken(
    existingUser.userId,
    createdSession.sessionId,
    existingUser.flags
  );
  const refreshToken = createRefreshToken(
    existingUser.userId,
    createdSession.sessionId,
    existingUser.flags
  );

  respondSuccessWithHeaders({
    res,
    statusCode: 200,
    sentInfo: "login success",
    headers: {
      accessToken: accessToken,
      refreshTokenCookie: createRefreshTokenCookie(refreshToken),
    },
  });
};
