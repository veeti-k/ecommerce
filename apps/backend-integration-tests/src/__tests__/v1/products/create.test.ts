import { addCategory } from "../../../utils/categoryUtils";
import { productsBaseUrl, TestClient } from "../../../utils/misc";
import { getProduct, getRandomProduct } from "../../../utils/productUtils";
import { Flags } from "shared2";
import { zinc } from "shared";
import { testPerms } from "../../../utils/testPerms";

describe("v1 products create", () => {
  it("given valid request body it should create the product to db and zinc", async () => {
    const categoryId = await addCategory();
    const requestBody = getRandomProduct(categoryId);

    const client = new TestClient();

    await client.loginAs.Admin();

    const res = await client.post(productsBaseUrl, requestBody);

    await client.logout();

    expect(res.status).toBe(201);
    expect(res.data.productId).toBeDefined();

    const addedProduct = await getProduct(Number(res.data.productId));

    expect(addedProduct.name).toBe(requestBody.name);
    expect(addedProduct.description).toBe(requestBody.description);
    expect(addedProduct.shortDescription).toBe(requestBody.shortDescription);
    expect(addedProduct.price).toBe(requestBody.price);
    expect(addedProduct.discountedPrice).toBe(requestBody.discountedPrice);
    expect(addedProduct.discountPercent).toBe(requestBody.discountPercent);
    expect(addedProduct.discountAmount).toBe(requestBody.discountAmount);
    expect(addedProduct.isDiscounted).toBe(requestBody.isDiscounted);
    expect(addedProduct.bulletPoints).toEqual(requestBody.bulletPoints.join(","));
    expect(addedProduct.imageLinks).toEqual(requestBody.imageLinks.join(","));
    expect(addedProduct.deepestCategoryId).toBe(requestBody.deepestCategoryId);

    expect(addedProduct.averageStars).toBe(0);
    expect(addedProduct.reviewCount).toBe(0);
    expect(addedProduct.questionCount).toBe(0);
    expect(addedProduct.isDeleted).toBe(false);

    const zincProduct = await zinc.getProductById(addedProduct.productId);

    expect(zincProduct?._source.name).toEqual(addedProduct.name);
    expect(zincProduct?._source.description).toEqual(addedProduct.description);
    expect(zincProduct?._source.shortDescription).toEqual(addedProduct.shortDescription);
    expect(zincProduct?._source.price).toEqual(addedProduct.price);
    expect(zincProduct?._source.discountedPrice).toEqual(addedProduct.discountedPrice);
    expect(zincProduct?._source.discountPercent).toEqual(addedProduct.discountPercent);
    expect(zincProduct?._source.discountAmount).toEqual(addedProduct.discountAmount);
    expect(zincProduct?._source.isDiscounted).toEqual(addedProduct.isDiscounted);
    expect(zincProduct?._source.bulletPoints).toEqual(addedProduct.bulletPoints);
    expect(zincProduct?._source.imageLinks).toEqual(addedProduct.imageLinks);
    expect(zincProduct?._source.deepestCategoryId).toEqual(addedProduct.deepestCategoryId);
  });

  it("given invalid request body it should return 400", async () => {
    const client = new TestClient();

    await client.loginAs.Admin();

    const res = await client.post(productsBaseUrl, {});

    await client.logout();

    expect(res.status).toBe(400);
  });

  it("given deepestCategoryId that doesn't exist it should return 400", async () => {
    const requestBody = getRandomProduct(Number.MAX_SAFE_INTEGER);

    const client = new TestClient();

    await client.loginAs.Admin();

    const res = await client.post(productsBaseUrl, requestBody);

    await client.logout();

    expect(res.status).toBe(400);
  });

  it("permission test", async () => {
    await testPerms(productsBaseUrl, "POST", Flags.ManageProducts);
  });
});
