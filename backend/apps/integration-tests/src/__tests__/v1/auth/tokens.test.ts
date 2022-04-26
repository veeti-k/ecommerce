import { config } from "config";
import { testRefreshTokenCookie } from "../../../utils/cookie";
import { TestClient, authBaseUrl } from "../../../utils/misc";

describe("v1 auth tokens", () => {
  it("given valid refresh token, should return 200 and new tokens", async () => {
    const client = new TestClient();

    const { refreshToken } = await client.loginAs.TestUser();

    const res = await client.get(`${authBaseUrl}/tokens`, {
      headers: {
        Cookie: config.headers.refreshTokenCookieName + "=" + refreshToken,
      },
    });

    expect(res.status).toBe(200);
    expect(res.headers[config.headers.accessTokenHeaderName]).toBeDefined();
    expect(res.headers["set-cookie"]![0]).toBeDefined();

    testRefreshTokenCookie(res.headers["set-cookie"]![0]);
  });

  it("given invalid refresh token, should return 401 and a correct error message", async () => {
    const res = await new TestClient().get(`${authBaseUrl}/tokens`, {
      headers: {
        Cookie: config.headers.refreshTokenCookieName + "=" + "invalid token",
      },
    });

    expect(res.status).toBe(401);
    expect(res.data).toEqual({
      code: 401,
      message: "Invalid refresh token",
    });

    expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  it("given no refresh token, should return 400 and a correct error message", async () => {
    const res = await new TestClient().get(`${authBaseUrl}/tokens`);

    expect(res.status).toBe(400);
    expect(res.data).toEqual({
      code: 400,
      message: "No refresh token",
    });

    expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
    expect(res.headers["set-cookie"]).toBeUndefined();
  });
});
