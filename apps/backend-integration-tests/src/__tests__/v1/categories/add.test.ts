import { categoriesBaseUrl, getRandomString, TestClient } from "../../../utils/misc";

describe("v1 category add", () => {
  it("given valid request body, should return 201 and the created category's id", async () => {
    const client = new TestClient();

    const requestBody = {
      name: getRandomString(),
      parentId: null,
    };

    await client.loginAs.Admin();

    const res = await client.post(categoriesBaseUrl, requestBody);

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

    await client.loginAs.Admin();

    const res = await client.post(categoriesBaseUrl, requestBody);

    await client.logout();

    expect(res.status).toBe(400);
  });

  describe("given invalid request body, should return 400 and the correct error message", () => {
    it("missing name", async () => {
      const client = new TestClient();

      const requestBody = {
        parentId: Number.MAX_SAFE_INTEGER,
      };

      await client.loginAs.Admin();

      const res = await client.post(categoriesBaseUrl, requestBody);

      await client.logout();

      expect(res.status).toBe(400);
    });
  });
});
