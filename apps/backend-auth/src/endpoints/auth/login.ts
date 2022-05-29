import { db } from "database";
import { Endpoint, respondError, respondSuccessWithHeaders } from "shared";
import { createRefreshTokenCookie } from "../../util/cookie";
import { comparePassword } from "../../util/hash";
import { createAccessToken, createRefreshToken } from "../../util/jwt";

export const login: Endpoint = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await db.users.users.get.oneByEmailWithPassword(email);
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

  const createdSession = await db.users.sessions.create(existingUser._id);

  const accessToken = createAccessToken(existingUser._id, createdSession._id, existingUser.flags);
  const refreshToken = createRefreshToken(existingUser._id, createdSession._id, existingUser.flags);

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
