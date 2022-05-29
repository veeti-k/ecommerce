import mongoose from "mongoose";
import { UserDocument } from "shared2";
import { userModelName } from "./modelNames";

export const UserModel = mongoose.modelNames().includes(userModelName)
  ? (mongoose.models[userModelName] as mongoose.Model<UserDocument, {}, {}, {}>)
  : mongoose.model<UserDocument>(
      "game",
      new mongoose.Schema<UserDocument>(
        {
          name: { type: String, required: true },
          email: { type: String, required: true },
          password: { type: String, required: true },
          phoneNumber: { type: String, default: null },
          flags: { type: String, default: "0" },
        },
        { timestamps: true, versionKey: false }
      )
    );
