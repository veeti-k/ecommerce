import mongoose, { Schema } from "mongoose";
import { productModelName } from "./modelNames";
import { ProductDocument } from "shared2";

export const ProductModel = mongoose.modelNames().includes(productModelName)
  ? (mongoose.models[productModelName] as mongoose.Model<ProductDocument, {}, {}, {}>)
  : mongoose.model<ProductDocument>(
      "game",
      new mongoose.Schema<ProductDocument>(
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          description: { type: String, required: true },
          shortDescription: { type: String, required: true },
          isDeleted: { type: Boolean, required: true },
          categoryId: { type: Schema.Types.ObjectId, required: true },
          images: { type: [String], required: true },
          bulletPoints: { type: [String], required: true },

          averageStars: { type: Number, required: true },
          reviewCount: { type: Number, required: true },
          questionCount: { type: Number, required: true },
        },
        { timestamps: true, versionKey: false }
      )
    );
