import { catalogueBaseUrl, getRandomString, TestClient } from "../../../../utils/misc";

describe("v1 category add", () => {
  it("given valid request body, should return 201 and the created category's id", async () => {
    const client = new TestClient();

    const requestBody = {
      name: getRandomString(),
      parentId: null,
    };

    await client.loginAs.admin();

    const res = await client.post(`${catalogueBaseUrl}/v1/categories`, requestBody);

    await client.logout();

    expect(res.status).toBe(201);
    expect(res.data).toEqual({
      categoryId: expect.any(Number),
    });
  });

  it("given not existing parent id, should return 400 and the correct error message", async () => {
    const client = new TestClient();

    const requestBody = {
      name: getRandomString(),
      parentId: Number.MAX_SAFE_INTEGER,
    };

    await client.loginAs.admin();

    const res = await client.post(`${catalogueBaseUrl}/v1/categories`, requestBody);

    await client.logout();

    expect(res.status).toBe(400);
    expect(res.data).toEqual({
      code: 400,
      message: "Parent category does not exist",
    });
  });

  describe("given invalid request body, should return 400 and the correct error message", () => {
    it("missing name", async () => {
      const client = new TestClient();

      const requestBody = {
        parentId: Number.MAX_SAFE_INTEGER,
      };

      await client.loginAs.admin();

      const res = await client.post(`${catalogueBaseUrl}/v1/categories`, requestBody);

      await client.logout();

      expect(res.status).toBe(400);
      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: { name: { message: "'name' is required" } },
      });
    });

    it("missing parentId", async () => {
      const client = new TestClient();

      const requestBody = {
        name: getRandomString(),
      };

      await client.loginAs.admin();

      const res = await client.post(`${catalogueBaseUrl}/v1/categories`, requestBody);

      await client.logout();

      expect(res.status).toBe(400);
      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: { parentId: { message: "'parentId' is required" } },
      });
    });
  });
});
