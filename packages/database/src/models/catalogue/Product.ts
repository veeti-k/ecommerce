import mongoose from 'mongoose'

export const GameModel = mongoose.modelNames().includes("game")
  ? (mongoose.models["game"] as mongoose.Model<IGame, {}, {}, {}>)
  : mongoose.model<IGame>(
      "game",
      new mongoose.Schema<IGame>({
        name: { type: String, required: true, unique: true },
        imageUrl: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        confirmed: { type: Boolean, required: true },
        revalidate: { type: Boolean, default: false },
        price: { type: Object },
      })
    );