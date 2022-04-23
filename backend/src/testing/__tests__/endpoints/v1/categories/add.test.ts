import { getRandomString, testHttpClient } from "../../../../utils/base";

describe("v1 categories add", () => {
  it("given valid request body, should return 201 and the created category's id", async () => {
    const requestBody = {
      name: getRandomString(),
      parentId: null,
    };

    const res = await testHttpClient.post("/v1/categories", requestBody);

    expect(res.status).toBe(201);
    expect(res.data).toEqual({
      categoryId: expect.any(Number),
    });
  });

  it("given not existing parent id, should return 400 and the correct error message", async () => {
    const requestBody = {
      name: getRandomString(),
      parentId: Number.MAX_SAFE_INTEGER,
    };

    const res = await testHttpClient.post("/v1/categories", requestBody);

    expect(res.status).toBe(400);
    expect(res.data).toEqual({
      code: 400,
      message: "Parent category does not exist",
    });
  });

  describe("given invalid request body, should return 400 and the correct error message", () => {
    it("missing name", async () => {
      const requestBody = {
        parentId: Number.MAX_SAFE_INTEGER,
      };

      const res = await testHttpClient.post("/v1/categories", requestBody);

      expect(res.status).toBe(400);
      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: { name: { message: "'name' is required" } },
      });
    });

    it("missing parentId", async () => {
      const requestBody = {
        name: getRandomString(),
      };

      const res = await testHttpClient.post("/v1/categories", requestBody);

      expect(res.status).toBe(400);
      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: { parentId: { message: "'parentId' is required" } },
      });
    });
  });
});
