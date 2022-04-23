import { db } from "../../../../../database";
import { TestClient } from "../../../../utils/base";
import { addCategory } from "../../../../utils/categoryUtils";

describe("v1 category remove", () => {
  it("given existing category id it should remove the category and return 204", async () => {
    const categoryId = await addCategory();

    const client = new TestClient();

    await client.loginAs.admin();

    const res = await client.delete(`/v1/categories/${categoryId}`);

    await client.logout();

    expect(res.status).toBe(204);

    const category = await db.category.get.byId(categoryId);

    expect(category).toBeNull();
  });

  it("given not existing category id it return 404 and the correct error message", async () => {
    const client = new TestClient();

    await client.loginAs.admin();

    const res = await client.delete(`/v1/categories/${Number.MAX_SAFE_INTEGER}`);

    await client.logout();

    expect(res.status).toBe(404);
    expect(res.data).toEqual({
      code: 404,
      message: "Category was not found",
    });
  });
});
