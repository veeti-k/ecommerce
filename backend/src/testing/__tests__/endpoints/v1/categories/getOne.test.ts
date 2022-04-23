import { db } from "../../../../../database";
import { TestClient } from "../../../../utils/base";
import { addCategory, addChildCategory } from "../../../../utils/categoryUtils";

describe("v1 category getOne", () => {
  beforeEach(async () => {
    await db.category.forTests.removeAll();
  });

  it("should return existing category correctly", async () => {
    const category1Id = await addCategory();
    const category2Id = await addChildCategory(category1Id);
    const category3Id = await addChildCategory(category1Id);
    const category4Id = await addChildCategory(category2Id);

    const client = new TestClient();

    const res = await client.get(`/v1/categories/${category1Id}`);

    expect(res.status).toBe(200);

    expect(res.data.categoryId).toBe(category1Id);
    expect(res.data.parentId).toBe(null);
    expect(res.data.children).toHaveLength(2);

    expect(res.data.children[0].categoryId).toBe(category2Id);
    expect(res.data.children[0].parentId).toBe(category1Id);
    expect(res.data.children[0].children).toHaveLength(1);

    expect(res.data.children[0].children[0].categoryId).toBe(category4Id);
    expect(res.data.children[0].children[0].parentId).toBe(category2Id);
    expect(res.data.children[0].children[0].children).toBeNull();

    expect(res.data.children[1].categoryId).toBe(category3Id);
    expect(res.data.children[1].parentId).toBe(category1Id);
    expect(res.data.children[1].children).toBeNull();
  });
});
