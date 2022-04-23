import { db } from "../../../../../database";
import { getRandomString, TestClient } from "../../../../utils/base";
import { addCategory } from "../../../../utils/categoryUtils";

describe("v1 category update", () => {
  it("given existing category, it should update the category and return 204", async () => {
    const categoryId = await addCategory();

    const requestBody = {
      name: getRandomString(),
      parentId: null,
    };

    const client = new TestClient();

    await client.loginAs.admin();

    const response = await client.patch(`/v1/categories/${categoryId}`, requestBody);

    await client.logout();

    expect(response.status).toBe(204);

    const updatedCategory = await db.category.get.byId(categoryId);

    expect(updatedCategory?.name).toBe(requestBody.name);
    expect(updatedCategory?.parentId).toBe(requestBody.parentId);
  });

  it("should return a 404 if the category does not exist", async () => {
    const requestBody = {
      name: getRandomString(),
      parentId: null,
    };

    const client = new TestClient();

    await client.loginAs.admin();

    const res = await client.patch(`/v1/categories/${Number.MAX_SAFE_INTEGER}`, requestBody);

    await client.logout();

    expect(res.status).toBe(404);
    expect(res.data).toEqual({
      code: 404,
      message: "Category was not found",
    });
  });

  it("should return a 404 if the parent category does not exist", async () => {
    const categoryId = await addCategory();

    const requestBody = {
      name: getRandomString(),
      parentId: Number.MAX_SAFE_INTEGER,
    };

    const client = new TestClient();

    await client.loginAs.admin();

    const res = await client.patch(`/v1/categories/${categoryId}`, requestBody);

    await client.logout();

    expect(res.status).toBe(404);
    expect(res.data).toEqual({
      code: 404,
      message: "Parent category was not found",
    });
  });

  describe("should return a 400 and the correct error message if the request body is invalid", () => {
    it("missing parentId", async () => {
      const categoryId = await addCategory();

      const requestBody = {
        name: getRandomString(),
      };

      const client = new TestClient();

      await client.loginAs.admin();

      const res = await client.patch(`/v1/categories/${categoryId}`, requestBody);

      await client.logout();

      expect(res.status).toBe(400);

      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: {
          parentId: {
            message: "'parentId' is required",
          },
        },
      });
    });

    it("missing name", async () => {
      const categoryId = await addCategory();

      const requestBody = {
        parentId: null,
      };

      const client = new TestClient();

      await client.loginAs.admin();

      const res = await client.patch(`/v1/categories/${categoryId}`, requestBody);

      await client.logout();

      expect(res.status).toBe(400);

      expect(res.data).toEqual({
        code: 400,
        message: "Invalid request body",
        errors: {
          name: {
            message: "'name' is required",
          },
        },
      });
    });
  });
});
