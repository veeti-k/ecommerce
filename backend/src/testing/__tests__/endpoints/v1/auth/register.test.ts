import { config } from "../../../../../config";
import { testRefreshTokenCookie } from "../../../../utils/authUtils";
import {
  getRandomName,
  getRandomEmail,
  getRandomPassword,
  baseUrl,
  testHttpClient,
} from "../../../../utils/base";

describe("v1 auth register", () => {
  it("given valid registration body, should create a new user, a new session and return 201", async () => {
    const requestBody = {
      name: getRandomName(),
      email: getRandomEmail(),
      password: getRandomPassword(),
    };

    const res = await testHttpClient.post(`${baseUrl}/v1/auth/register`, requestBody);

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
        password: getRandomPassword(),
      };

      const res = await testHttpClient.post(`${baseUrl}/v1/auth/register`, requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();

      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: { name: { message: "Name is required" } },
      });
    });

    it("missing email", async () => {
      const requestBody = {
        name: getRandomName(),
        password: getRandomPassword(),
      };

      const res = await testHttpClient.post(`${baseUrl}/v1/auth/register`, requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();

      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: { email: { message: "Email is required" } },
      });
    });

    it("missing password", async () => {
      const requestBody = {
        name: getRandomName(),
        email: getRandomEmail(),
      };

      const res = await testHttpClient.post(`${baseUrl}/v1/auth/register`, requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();

      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: { password: { message: "Password is required" } },
      });
    });
  });
});
