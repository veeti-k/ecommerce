import { respondError, respondSuccessWithHeaders } from "../../util/respondWith";
import { createAccessToken, createRefreshToken, decodeRefreshToken } from "../../util/jwt";
import { createRefreshTokenCookie } from "../../util/cookie";
import { RegisterRequestBodyValidator, LoginRequestBodyValidator } from "../../validators/v1";
import { comparePassword, hashPassword } from "../../util/hash";
import { db } from "../../database";
import { Endpoint } from "../../types/Endpoint";
import { SpecificErrorMessages } from "../../types/Errors";

export const register: Endpoint = async (req, res) => {
  const validationResult = RegisterRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: SpecificErrorMessages.INVALID_REQUEST_BODY,
    });

  const validBody = validationResult.validated;

  const existingByEmail = await db.user.get.byEmail(validBody.email);
  if (existingByEmail)
    return respondError({
      res,
      statusCode: 400,
      message: "Email taken",
    });

  const hashedPassword = await hashPassword(validBody.password);

  const result = await db.user.createUserAndSession(validBody, hashedPassword);

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

export const login: Endpoint = async (req, res) => {
  const validationResult = LoginRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: SpecificErrorMessages.INVALID_REQUEST_BODY,
    });

  const { email, password } = validationResult.validated;

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
