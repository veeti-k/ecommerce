import { Endpoint } from "../../../types/Endpoint";
import { createRefreshTokenCookie } from "../../../util/cookie";
import { decodeRefreshToken, createAccessToken, createRefreshToken } from "../../../util/jwt";
import { respondError, respondSuccessWithHeaders } from "../../../util/respondWith";

export const tokens: Endpoint = (req, res) => {
  const refreshToken = req.headers.cookie?.split("=")[1];

  if (!refreshToken)
    return respondError({
      res,
      statusCode: 400,
      message: "No refresh token",
    });

  const result = decodeRefreshToken(refreshToken);
  if (!result.isValid)
    return respondError({
      res,
      statusCode: 401,
      message: "Invalid refresh token",
    });

  const { userId, sessionId, flags } = result.payload;

  const newAccessToken = createAccessToken(userId, sessionId, flags);
  const newRefreshToken = createRefreshToken(userId, sessionId, flags);

  respondSuccessWithHeaders({
    res,
    statusCode: 200,
    headers: {
      accessToken: newAccessToken,
      refreshTokenCookie: createRefreshTokenCookie(newRefreshToken),
    },
    sentInfo: "tokens refreshed success",
  });
};
