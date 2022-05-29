import mongoose, { Schema } from "mongoose";
import { categoryModelName } from "./modelNames";
import { CategoryDocument } from "shared2";

export const CategoryModel = mongoose.modelNames().includes(categoryModelName)
  ? (mongoose.models[categoryModelName] as mongoose.Model<CategoryDocument, {}, {}, {}>)
  : mongoose.model<CategoryDocument>(
      "game",
      new mongoose.Schema<CategoryDocument>(
        {
          name: { type: String, required: true },
          parentId: { type: Schema.Types.ObjectId, ref: categoryModelName, required: true },
        },
        { timestamps: true, versionKey: false }
      )
    );
