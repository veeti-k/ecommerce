import mongoose, { Schema } from "mongoose";
import { QuestionAnswerDocument, QuestionDocument } from "shared2";
import { questionAnswerModelName, questionModelName } from "./modelNames";

export const QuestionModel = mongoose.modelNames().includes(questionModelName)
  ? (mongoose.models[questionModelName] as mongoose.Model<QuestionDocument, {}, {}, {}>)
  : mongoose.model<QuestionDocument>(
      "game",
      new mongoose.Schema<QuestionDocument>(
        {
          productId: { type: Schema.Types.ObjectId, required: true },
          title: { type: String, required: true },
          content: { type: String, required: true },
          isApproved: { type: Boolean, required: true },
          nickname: { type: String, required: true },
        },
        { timestamps: true, versionKey: false }
      )
    );

export const QuestionAnswerModel = mongoose.modelNames().includes(questionAnswerModelName)
  ? (mongoose.models[questionAnswerModelName] as mongoose.Model<QuestionAnswerDocument, {}, {}, {}>)
  : mongoose.model<QuestionAnswerDocument>(
      "game",
      new mongoose.Schema<QuestionAnswerDocument>(
        {
          productId: { type: Schema.Types.ObjectId, required: true },
          questionId: { type: Schema.Types.ObjectId, required: true },
          nickname: { type: String, required: true },
          content: { type: String, required: true },
          byEmployee: { type: Boolean, required: true },
          isApproved: { type: Boolean, required: true },
        },
        { timestamps: true, versionKey: false }
      )
    );
