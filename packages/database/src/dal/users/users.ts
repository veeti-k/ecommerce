import { UserDocument, UserWOutPasswordDocument, validationSchemas } from "shared2";
import { UserModel } from "../../models/users/User";

export const create = (
  body: Omit<validationSchemas.IRegisterBody, "password">,
  hashedPassword: string
) =>
  new UserModel({
    ...body,
    hashedPassword,
  }).save();

export const get = {
  oneByIdWithPassword: async (userId: string): Promise<UserDocument | null> =>
    UserModel.findOne({ _id: userId }).lean(),

  oneById: async (userId: string): Promise<UserWOutPasswordDocument | null> =>
    UserModel.findOne({ _id: userId }).select("-password").lean(),

  oneByEmail: async (email: string): Promise<UserWOutPasswordDocument | null> =>
    UserModel.findOne({ email }).select("-password").lean(),

  oneByEmailWithPassword: async (email: string): Promise<UserDocument | null> =>
    UserModel.findOne({ email }).lean(),
};

export const update = async (
  userId: string,
  body: validationSchemas.IUpdateMeBody
): Promise<UserWOutPasswordDocument | null> =>
  UserModel.findOneAndUpdate({ _id: userId }, body, { new: true }).select("-password").lean();
