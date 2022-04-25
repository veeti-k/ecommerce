import { zinc } from "shared";
import { addCategory } from "../../../utils/categoryUtils";
import { catalogueBaseUrl, TestClient } from "../../../utils/misc";
import { addProduct, getProduct, getRandomProduct } from "../../../utils/productUtils";

describe("v1 products update", () => {
  it("given valid request body it should update the product (db and zinc)", async () => {
    const categoryId = await addCategory();
    const newCategoryId = await addCategory();
    const productId = await addProduct(categoryId);

    const client = new TestClient();

    const requestBody = getRandomProduct(newCategoryId);

    await client.loginAs.Admin();

    const res = await client.patch(`${catalogueBaseUrl}/v1/products/${productId}`, requestBody);

    await client.logout();

    if (res.status !== 204) console.log(res);
    expect(res.status).toBe(204);

    const updatedProduct = await getProduct(productId);

    expect(updatedProduct.name).toBe(requestBody.name);
    expect(updatedProduct.description).toBe(requestBody.description);
    expect(updatedProduct.shortDescription).toBe(requestBody.shortDescription);
    expect(updatedProduct.price).toBe(requestBody.price);
    expect(updatedProduct.discountedPrice).toBe(requestBody.discountedPrice);
    expect(updatedProduct.discountPercent).toBe(requestBody.discountPercent);
    expect(updatedProduct.discountAmount).toBe(requestBody.discountAmount);
    expect(updatedProduct.isDiscounted).toBe(requestBody.isDiscounted);
    expect(updatedProduct.bulletPoints).toEqual(requestBody.bulletPoints.join(","));
    expect(updatedProduct.imageLinks).toEqual(requestBody.imageLinks.join(","));
    expect(updatedProduct.deepestCategoryId).toBe(requestBody.deepestCategoryId);

    const zincProduct = await zinc.getProductById(productId);

    expect(zincProduct?._source.name).toEqual(updatedProduct.name);
    expect(zincProduct?._source.description).toEqual(updatedProduct.description);
    expect(zincProduct?._source.shortDescription).toEqual(updatedProduct.shortDescription);
    expect(zincProduct?._source.price).toEqual(updatedProduct.price);
    expect(zincProduct?._source.discountedPrice).toEqual(updatedProduct.discountedPrice);
    expect(zincProduct?._source.discountPercent).toEqual(updatedProduct.discountPercent);
    expect(zincProduct?._source.discountAmount).toEqual(updatedProduct.discountAmount);
    expect(zincProduct?._source.isDiscounted).toEqual(updatedProduct.isDiscounted);
    expect(zincProduct?._source.bulletPoints).toEqual(updatedProduct.bulletPoints);
    expect(zincProduct?._source.imageLinks).toEqual(updatedProduct.imageLinks);
    expect(zincProduct?._source.deepestCategoryId).toEqual(updatedProduct.deepestCategoryId);
  });
});
