import axios from "axios";
import { config } from "../../config";
import { seededUsers } from "../../seededUsers";

const baseUrl = `http://test-backend:3000/api`;

describe("v1 auth endpoints", () => {
  describe("POST /v1/auth/login", () => {
    describe("given correct login info", () => {
      it("should return 200 and set correct headers", async () => {
        const requestBody = seededUsers.find((user) => user.flags == 1);

        const res = await axios.post(`${baseUrl}/v1/auth/login`, requestBody);

        expect(res.status).toBe(200);
        expect(res.headers["access-token"]).toBeDefined();
        expect(res.headers["set-cookie"]![0]).toContain("refresh-token");
        expect(res.headers["set-cookie"]![0]).toContain("HttpOnly;");
        expect(res.headers["set-cookie"]![0]).toContain("Secure;");
        expect(res.headers["set-cookie"]![0]).toContain("SameSite=Strict;");
        expect(res.headers["set-cookie"]![0]).toContain(
          `Path=${config.headers.refreshTokenCookiePath};`
        );
      });
    });
  });
});
