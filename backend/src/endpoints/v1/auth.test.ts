import axios from "axios";
import { config } from "../../config";

const baseUrl = `http://test-backend:${config.port}/api`;

describe("v1 auth endpoints", () => {
  describe("POST /v1/auth/login", () => {
    it("given correct login info it should return 200 and set correct headers", async () => {
      const requestBody = {
        email: "ADMINISTRATOR@test.test",
        password: "ADMINISTRATOR-password",
      };

      const res = await axios.post(`${baseUrl}/v1/auth/login`, requestBody);

      expect(res.status).toBe(200);
      expect(res.headers["access-token"]).toBeDefined();
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(res.headers["set-cookie"]).toHaveLength(1);
      expect(res.headers["set-cookie"]![0]).toContain("refresh-token");
      expect(res.headers["set-cookie"]![0]).toContain("HttpOnly;");
      expect(res.headers["set-cookie"]![0]).toContain("Secure;");
      expect(res.headers["set-cookie"]![0]).toContain("SameSite=Strict;");
      expect(res.headers["set-cookie"]![0]).toContain(
        `Path=${config.headers.refreshTokenCookiePath};`
      );
    });

    it("given correct email, incorrect password it should not set headers, return 400 and the correct error message", async () => {
      const requestBody = {
        email: "ADMINISTRATOR@test.test",
        password: "wrongpassword",
      };

      const request = axios.post(`${baseUrl}/v1/auth/login`, requestBody, {
        validateStatus: () => true,
      });

      const res = await request;

      expect(res.status).toBe(400);
      expect(res.headers["access-token"]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();

      expect(res.data).toEqual({
        code: 400,
        message: "Invalid password",
      });
    });

    it("given incorrect email it should not set headers, return 400 and the correct error message", async () => {
      const requestBody = {
        email: "wrong@email.email",
        password: "wrongpassword",
      };

      const request = axios.post(`${baseUrl}/v1/auth/login`, requestBody, {
        validateStatus: () => true,
      });

      const res = await request;

      expect(res.status).toBe(400);
      expect(res.headers["access-token"]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();

      expect(res.data).toEqual({
        code: 400,
        message: "User not found",
      });
    });
  });
});
