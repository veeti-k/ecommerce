import { config } from "../../../../../config";
import { testRefreshTokenCookie } from "../../../../utils/authUtils";
import { getRandomEmail, getRandomString, TestClient } from "../../../../utils/base";

describe("v1 auth login", () => {
  describe("Logging in", () => {
    it("given correct login info it should return 200 and set correct headers", async () => {
      const requestBody = {
        email: "ADMINISTRATOR@test.test",
        password: "ADMINISTRATOR-password",
      };

      const res = await new TestClient().post("/v1/auth/login", requestBody);

      expect(res.status).toBe(200);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeDefined();
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(res.headers["set-cookie"]).toHaveLength(1);
      testRefreshTokenCookie(res.headers["set-cookie"]![0]);
    });

    it("given correct email, incorrect password it should not set headers, return 400 and the correct error message", async () => {
      const requestBody = {
        email: "ADMINISTRATOR@test.test",
        password: "wrongpassword",
      };

      const res = await new TestClient().post("/v1/auth/login", requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
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

      const res = await new TestClient().post("/v1/auth/login", requestBody);

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();

      expect(res.data).toEqual({
        code: 400,
        message: "User not found",
      });
    });

    describe("given invalid request body it should not set headers, return 400 and the correct error message", () => {
      it("missing email", async () => {
        const requestBody = {
          password: getRandomString(),
        };

        const res = await new TestClient().post("/v1/auth/login", requestBody);

        expect(res.status).toBe(400);
        expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
        expect(res.headers["set-cookie"]).toBeUndefined();

        expect(res.data).toEqual({
          code: 400,
          message: "Invalid request body",
          errors: { email: { message: "'email' is required" } },
        });
      });

      it("missing password", async () => {
        const requestBody = {
          email: getRandomEmail(),
        };

        const res = await new TestClient().post("/v1/auth/login", requestBody);

        expect(res.status).toBe(400);
        expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
        expect(res.headers["set-cookie"]).toBeUndefined();

        expect(res.data).toEqual({
          code: 400,
          message: "Invalid request body",
          errors: { password: { message: "'password' is required" } },
        });
      });
    });
  });
});
