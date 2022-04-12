import { Address } from "../../types";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteAddressRequest = async (addressId: string) =>
  await request({
    method: "DELETE",
    path: apiRoutes.user.addresses.address("me", addressId),
  });

export const EditAddressRequest = async (addressId: string, address: Omit<Address, "id">) =>
  await request({
    method: "PATCH",
    path: apiRoutes.user.addresses.address("me", addressId),
    body: address,
  });
