import mongoose, { Schema } from "mongoose";
import { ReviewCommentDocument, ReviewDocument } from "shared2";
import { reviewCommentModelName, reviewModelName } from "./modelNames";

export const ReviewModel = mongoose.modelNames().includes(reviewModelName)
  ? (mongoose.models[reviewModelName] as mongoose.Model<ReviewDocument, {}, {}, {}>)
  : mongoose.model<ReviewDocument>(
      "game",
      new mongoose.Schema<ReviewDocument>(
        {
          productId: { type: Schema.Types.ObjectId, required: true },
          title: { type: String, required: true },
          content: { type: String, required: true },
          isApproved: { type: Boolean, required: true },
          nickname: { type: String, required: true },
          byEmployee: { type: Boolean, required: true },
          stars: { type: Number, required: true },
        },
        { timestamps: true }
      )
    );

export const ReviewCommentModel = mongoose.modelNames().includes(reviewCommentModelName)
  ? (mongoose.models[reviewCommentModelName] as mongoose.Model<ReviewCommentDocument, {}, {}, {}>)
  : mongoose.model<ReviewCommentDocument>(
      "game",
      new mongoose.Schema<ReviewCommentDocument>(
        {
          reviewId: { type: Schema.Types.ObjectId, required: true },
          productId: { type: Schema.Types.ObjectId, required: true },
          nickname: { type: String, required: true },
          title: { type: String, required: true },
          content: { type: String, required: true },
          isApproved: { type: Boolean, required: true },
          byEmployee: { type: Boolean, required: true },
        },
        { timestamps: true }
      )
    );
