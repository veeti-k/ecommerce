import { getRandomString, testHttpClient } from "./base";

export const addCategory = async () => {
  const requestBody = {
    name: getRandomString(),
    parentId: null,
  };

  const res = await testHttpClient.post("/v1/categories", requestBody);

  expect(res.status).toBe(201);
  expect(res.data.categoryId).toBeDefined();

  return Number(res.data.categoryId);
};
