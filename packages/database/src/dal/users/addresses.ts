import { IAddress } from "shared2";
import { AddressModel } from "../../models/users/Address";

export const create = (userId: string, address: Omit<IAddress, "userId">) =>
  new AddressModel({ userId, ...address }).save();

export const update = (userId: string, addressId: string, address: IAddress) =>
  AddressModel.findOneAndUpdate({ userId, _id: addressId }, address, { new: true }).lean();

export const remove = (userId: string, addressId: string) =>
  AddressModel.findOneAndRemove({ userId, _id: addressId }).lean();

export const get = {
  byUserId: (userId: string) => AddressModel.findOne({ userId }).lean(),

  oneById: (userId: string, addressId: string) =>
    AddressModel.findOne({ userId, _id: addressId }).lean(),
};
