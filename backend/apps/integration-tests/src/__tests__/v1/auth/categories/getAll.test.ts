import { Category, ResolvedCategory } from "shared";
import { addCategory, addChildCategory } from "../../../../utils/categoryUtils";
import { TestClient } from "../../../../utils/misc";

describe("v1 category getAll", () => {
  beforeEach(async () => {
    await db.category.forTests.removeAll();
  });

  it("given no 'resolved' query param, doesn't return resolved categories", async () => {
    const ids = await Promise.all([
      addCategory(),
      addCategory(),
      addCategory(),
      addCategory(),
      addCategory(),
    ]);

    const client = new TestClient();

    const res = await client.get("/v1/categories");

    expect(res.status).toBe(200);

    expect(res.data.length).toBe(5);
    expect(res.data.some((c: Category) => !ids.includes(c.categoryId))).toBeFalsy();
    expect(res.data.resolvedCategories).toBeUndefined();
  });

  it("given 'resolved' query param, returns categories and resolved categories", async () => {
    await Promise.all([addCategory(), addCategory(), addCategory(), addCategory(), addCategory()]);

    const client = new TestClient();

    const res = await client.get("/v1/categories?resolved=true");

    expect(res.status).toBe(200);

    expect(res.data.categories).toBeDefined();
    expect(res.data.resolvedCategories).toBeDefined();
  });

  it("resolves categories correctly", async () => {
    const category1Id = await addCategory();
    const category2Id = await addChildCategory(category1Id);
    const category3Id = await addChildCategory(category1Id);
    const category4Id = await addChildCategory(category2Id);

    const category5Id = await addCategory();
    const category6Id = await addChildCategory(category5Id);
    const category7Id = await addChildCategory(category6Id);
    const category8Id = await addChildCategory(category7Id);

    const client = new TestClient();

    const res = await client.get("/v1/categories?resolved=true");

    expect(res.status).toBe(200);

    expect(res.data.categories).toBeDefined();
    expect(res.data.resolvedCategories).toBeDefined();

    const categories = res.data.categories as Category[];
    const resolvedCategories = res.data.resolvedCategories as ResolvedCategory[];

    expect(categories.length).toBe(8);
    expect(resolvedCategories.length).toBe(2);

    const category1Eq = resolvedCategories.find((c) => c.categoryId === category1Id);
    expect(category1Eq).toBeDefined();
    expect(category1Eq?.children?.length).toBe(2);
    expect(category1Eq?.children?.some((c) => c.categoryId === category2Id)).toBeTruthy();
    expect(category1Eq?.children?.some((c) => c.categoryId === category3Id)).toBeTruthy();

    const category2Eq = category1Eq?.children!.find((c) => c.categoryId === category2Id);
    expect(category2Eq).toBeDefined();
    expect(category2Eq?.children?.length).toBe(1);
    expect(category2Eq?.children?.some((c) => c.categoryId === category4Id)).toBeTruthy();

    const category3Eq = category1Eq?.children!.find((c) => c.categoryId === category3Id);
    expect(category3Eq).toBeDefined();
    expect(category3Eq?.children).toBeNull();

    const category4Eq = category2Eq?.children!.find((c) => c.categoryId === category4Id);
    expect(category4Eq).toBeDefined();
    expect(category4Eq?.children).toBeNull();

    const category5Eq = resolvedCategories.find((c) => c.categoryId === category5Id);
    expect(category5Eq).toBeDefined();
    expect(category5Eq?.children?.length).toBe(1);
    expect(category5Eq?.children?.some((c) => c.categoryId === category6Id)).toBeTruthy();

    const category6Eq = category5Eq?.children!.find((c) => c.categoryId === category6Id);
    expect(category6Eq).toBeDefined();
    expect(category6Eq?.children?.length).toBe(1);
    expect(category6Eq?.children?.some((c) => c.categoryId === category7Id)).toBeTruthy();

    const category7Eq = category6Eq?.children!.find((c) => c.categoryId === category7Id);
    expect(category7Eq).toBeDefined();
    expect(category7Eq?.children?.length).toBe(1);
    expect(category7Eq?.children?.some((c) => c.categoryId === category8Id)).toBeTruthy();

    const category8Eq = category7Eq?.children!.find((c) => c.categoryId === category8Id);
    expect(category8Eq).toBeDefined();
    expect(category8Eq?.children).toBeNull();
  });
});
