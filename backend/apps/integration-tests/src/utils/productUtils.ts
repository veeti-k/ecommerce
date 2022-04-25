import { CreateProductRequestBody, Product } from "shared";
import {
  catalogueBaseUrl,
  getRandomBoolean,
  getRandomInt,
  getRandomString,
  TestClient,
} from "./misc";

export const getRandomProduct = (categoryId: number): CreateProductRequestBody => ({
  name: getRandomString(),
  description: getRandomString(),
  shortDescription: getRandomString(),
  price: getRandomInt(),
  discountedPrice: getRandomInt(),
  discountPercent: getRandomInt(),
  discountAmount: getRandomInt(),
  isDiscounted: getRandomBoolean(),
  bulletPoints: [getRandomString(), getRandomString()],
  imageLinks: [getRandomString(), getRandomString()],
  deepestCategoryId: categoryId,
});

export const addProduct = async (categoryId: number): Promise<number> => {
  const client = new TestClient();

  const requestBody = getRandomProduct(categoryId);

  await client.loginAs.Admin();

  const res = await client.post(`${catalogueBaseUrl}/v1/products`, requestBody);

  await client.logout();

  if (res.status !== 201) throw new Error("testUril::addProduct - failed to add product");

  return res.data.productId;
};

export const getProduct = async (productId: number): Promise<Product> => {
  const client = new TestClient();

  const res = await client.get(`${catalogueBaseUrl}/v1/products/${productId}`);

  if (res.status > 300) throw new Error("testUtil::getProduct - Failed to get product by id");

  return res.data;
};
