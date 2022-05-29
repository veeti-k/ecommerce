import mongoose, { Schema } from "mongoose";
import { AddressDocument } from "shared2";
import { addressModelName } from "./modelNames";

export const AddressModel = mongoose.modelNames().includes(addressModelName)
  ? (mongoose.models[addressModelName] as mongoose.Model<AddressDocument, {}, {}, {}>)
  : mongoose.model<AddressDocument>(
      "game",
      new mongoose.Schema<AddressDocument>(
        {
          userId: { type: Schema.Types.ObjectId, required: true },
          name: { type: String, required: true },
          phoneNumber: { type: String },
          email: { type: String, required: true },
          streetAddress: { type: String },
          city: { type: String },
          state: { type: String },
          zip: { type: String },
        },
        { timestamps: true, versionKey: false }
      )
    );
