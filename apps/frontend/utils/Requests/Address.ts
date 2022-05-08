import { Address } from "../../types/User";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteAddressRequest = (addressId: string) =>
  request({
    method: "DELETE",
    path: apiRoutes.user.addresses.address("me", addressId),
  });

export const EditAddressRequest = (addressId: string, address: Omit<Address, "addressId">) =>
  request({
    method: "PATCH",
    path: apiRoutes.user.addresses.address("me", addressId),
    body: address,
  });

export const NewAddressRequest = (address: Omit<Address, "addressId">) =>
  request({
    method: "POST",
    path: apiRoutes.user.addressesRoot("me"),
    body: address,
  });
