import { Endpoint, respondError, respondSuccessWithHeaders } from "shared";
import { createRefreshTokenCookie } from "../../../util/cookie";
import { decodeRefreshToken, createAccessToken, createRefreshToken } from "../../../util/jwt";

export const tokens: Endpoint = (req, res) => {
  const refreshToken = req.headers.cookie?.split(";")[0].split("=")[1] as string;

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
