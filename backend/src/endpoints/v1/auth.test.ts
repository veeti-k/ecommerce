import axios from "axios";
import { config } from "../../config";

const baseUrl = `http://test-backend:${config.port}/api`;

axios.defaults.validateStatus = () => true;

const getRandomEmail = () => Math.random().toString().slice(2, 20) + "@test.test";
const getRandomName = () => Math.random().toString().slice(2, 20) + "test-name";
const getRandomPassword = () => Math.random().toString().slice(2, 20) + "test-password";

describe("v1 auth endpoints", () => {
  describe("Logging in", () => {
    it("given correct login info it should return 200 and set correct headers", async () => {
      const requestBody = {
        email: "ADMINISTRATOR@test.test",
        password: "ADMINISTRATOR-password",
      };

      const res = await axios.post(`${baseUrl}/v1/auth/login`, requestBody);

      expect(res.status).toBe(200);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeDefined();
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(res.headers["set-cookie"]).toHaveLength(1);
      expect(res.headers["set-cookie"]![0]).toContain(config.headers.refreshTokenCookieName);
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

      const request = axios.post(`${baseUrl}/v1/auth/login`, requestBody);

      const res = await request;

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

      const request = axios.post(`${baseUrl}/v1/auth/login`, requestBody, {
        validateStatus: () => true,
      });

      const res = await request;

      expect(res.status).toBe(400);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeUndefined();
      expect(res.headers["set-cookie"]).toBeUndefined();

      expect(res.data).toEqual({
        code: 400,
        message: "User not found",
      });
    });
  });

  describe("Registration", () => {
    it("given valid registration body, should create a new user, a new session and return 201", async () => {
      const requestBody = {
        name: getRandomName(),
        email: getRandomEmail(),
        password: getRandomPassword(),
      };

      const res = await axios.post(`${baseUrl}/v1/auth/register`, requestBody);

      expect(res.status).toBe(201);
      expect(res.headers[config.headers.accessTokenHeaderName]).toBeDefined();
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(res.headers["set-cookie"]).toHaveLength(1);

      expect(res.headers["set-cookie"]![0]).toContain(config.headers.refreshTokenCookieName);
      expect(res.headers["set-cookie"]![0]).toContain("HttpOnly;");
      expect(res.headers["set-cookie"]![0]).toContain("Secure;");
      expect(res.headers["set-cookie"]![0]).toContain("SameSite=Strict;");
      expect(res.headers["set-cookie"]![0]).toContain(
        `Path=${config.headers.refreshTokenCookiePath};`
      );
    });

    describe("given invalid registration body, should not create a new user, should not create a new session, should return 400 and should return the correct error message", () => {
      it("missing name", async () => {
        const requestBody = {
          email: getRandomEmail(),
          password: getRandomPassword(),
        };

        const res = await axios.post(`${baseUrl}/v1/auth/register`, requestBody);

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

        const res = await axios.post(`${baseUrl}/v1/auth/register`, requestBody);

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

        const res = await axios.post(`${baseUrl}/v1/auth/register`, requestBody);

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
});
