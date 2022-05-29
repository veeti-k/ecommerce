import { db } from "database";
import { Endpoint, respondError, respondSuccessWithHeaders } from "shared";
import { createRefreshTokenCookie } from "../../util/cookie";
import { hashPassword } from "../../util/hash";
import { createAccessToken, createRefreshToken } from "../../util/jwt";

export const register: Endpoint = async (req, res) => {
  const body = req.body;

  const existingByEmail = await db.users.users.get.oneByEmail(body.email);
  if (existingByEmail)
    return respondError({
      res,
      statusCode: 400,
      message: "Email taken",
    });

  const hashedPassword = await hashPassword(body.password);

  const createdUser = await db.users.users.create(
    {
      name: body.name,
      email: body.email,
    },
    hashedPassword
  );

  const createdSession = await db.users.sessions.create(createdUser._id);

  const accessToken = createAccessToken(createdUser._id, createdSession._id, createdUser.flags);
  const refreshToken = createRefreshToken(createdUser._id, createdSession._id, createdUser.flags);

  respondSuccessWithHeaders({
    res,
    statusCode: 201,
    json: { userId: createdUser._id },
    headers: {
      accessToken: accessToken,
      refreshTokenCookie: createRefreshTokenCookie(refreshToken),
    },
    sentInfo: "register success + new user id",
  });
};
