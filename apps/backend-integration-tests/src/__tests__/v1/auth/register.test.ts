import { config } from "config";
import { testRefreshTokenCookie } from "../../../utils/cookie";
import { authBaseUrl, getRandomEmail, getRandomString, TestClient } from "../../../utils/misc";

describe("v1 auth register", () => {
  it("given valid registration body, should create a new user, a new session and return 201", async () => {
    const requestBody = {
      name: getRandomString(),
      email: getRandomEmail(),
      password: getRandomString(),
    };

    const res = await new TestClient().post(`${authBaseUrl}/register`, requestBody);

    expect(res.status).toBe(201);
    expect(res.headers[config.headers.accessTokenHeaderName]).toBeDefined();
    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.headers["set-cookie"]).toHaveLength(1);

    testRefreshTokenCookie(res.headers["set-cookie"]![0]);
  });

  describe("given invalid registration body, should return 400 and should return the correct error message", () => {
    it("missing name", async () => {
      const requestBody = {
        email: getRandomEmail(),
        password: getRandomString(),
      };

      const res = await new TestClient().post(`${authBaseUrl}/register`, requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();
    });

    it("missing email", async () => {
      const requestBody = {
        name: getRandomString(),
        password: getRandomString(),
      };

      const res = await new TestClient().post(`${authBaseUrl}/register`, requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();
    });

    it("missing password", async () => {
      const requestBody = {
        name: getRandomString(),
        email: getRandomEmail(),
      };

      const res = await new TestClient().post(`${authBaseUrl}/register`, requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();
    });
  });
});