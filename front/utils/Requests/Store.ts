import { Store } from "../../types/Store";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const AddStoreRequest = (newStore: Omit<Store, "id">) =>
  request({
    path: apiRoutes.storesRoot,
    method: "POST",
    body: { ...newStore },
  });

export const GetStoresRequest = () =>
  request({
    path: apiRoutes.storesRoot,
    method: "GET",
  });

export const DeleteStoreRequest = (storeId: string) =>
  request({
    path: apiRoutes.stores.store(storeId),
    method: "DELETE",
  });
