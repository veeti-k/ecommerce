import { catalogueBaseUrl, getRandomString, TestClient } from "./misc";

export const addCategory = async () => {
  const client = new TestClient();

  const requestBody = {
    name: getRandomString(),
    parentId: null,
  };

  await client.loginAs.admin();

  const res = await client.post(`${catalogueBaseUrl}/v1/categories`, requestBody);

  await client.logout();

  expect(res.status).toBe(201);
  expect(res.data.categoryId).toBeDefined();

  return Number(res.data.categoryId);
};

export const addChildCategory = async (parentId: number) => {
  const client = new TestClient();

  const requestBody = {
    name: getRandomString(),
    parentId,
  };

  await client.loginAs.admin();

  const res = await client.post(`${catalogueBaseUrl}/v1/categories`, requestBody);

  await client.logout();

  expect(res.status).toBe(201);
  expect(res.data.categoryId).toBeDefined();

  return Number(res.data.categoryId);
};
