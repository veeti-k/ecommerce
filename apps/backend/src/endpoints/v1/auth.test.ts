import axios from "axios";
import { seededUsers } from "../../seededUsers";

const baseUrl = `http://test-backend:${process.env.PORT}/api`;

describe("v1 auth endpoints", () => {
  describe("POST /v1/auth/login", () => {
    describe("given correct login info", () => {
      // prettier-ignore
      it("should return 200 and set correct headers", async () => {
        const requestBody = seededUsers.find((user) => user.flags == 1);

        const res = await axios.post(`${baseUrl}/v1/auth/login`, requestBody);

        expect(res.status).toBe(200);
        expect(res.headers["access-token"]).toBeDefined();
        expect(res.headers["set-cookie"]).toContain("refresh-token");
        expect(res.headers["set-cookie"]).toContain("HttpOnly;");
        expect(res.headers["set-cookie"]).toContain("Secure;");
        expect(res.headers["set-cookie"]).toContain("SameSite=Strict;");
        expect(res.headers["set-cookie"]).toContain(`Path=/api/v1/auth/tokens;`);
      });
    });
  });
});
