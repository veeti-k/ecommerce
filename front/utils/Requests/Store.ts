import { Store } from "../../types/Store";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const AddStoreRequest = async (newStore: Omit<Store, "id">) =>
  await request({
    path: apiRoutes.storesRoot,
    method: "POST",
    body: { ...newStore },
  });

export const GetStoresRequest = async () =>
  await request({
    path: apiRoutes.storesRoot,
    method: "GET",
  });

export const DeleteStoreRequest = async (storeId: string) =>
  await request({
    path: apiRoutes.stores.store(storeId),
    method: "DELETE",
  });
