import mongoose, { Schema } from "mongoose";
import { SessionDocument } from "shared2";
import { sessionModelName } from "./modelNames";

export const SessionModel = mongoose.modelNames().includes(sessionModelName)
  ? (mongoose.models[sessionModelName] as mongoose.Model<SessionDocument, {}, {}, {}>)
  : mongoose.model<SessionDocument>(
      "game",
      new mongoose.Schema<SessionDocument>(
        {
          userId: { type: Schema.Types.ObjectId, required: true },
          lastUsedAt: { type: Date, required: true },
        },
        { timestamps: true, versionKey: false }
      )
    );
