import { SessionModel } from "../../models/users/Session";

export const create = (userId: string) =>
  new SessionModel({ userId, lastUsedAt: new Date() }).save();

export const updateLastUsedAt = (sessionId: string) =>
  SessionModel.findOneAndUpdate(
    { _id: sessionId },
    { lastUsedAt: new Date() },
    { new: true }
  ).lean();

export const revokeMany = (userId: string, sessionIds: string[]) =>
  SessionModel.deleteOne({ userId, _id: { $in: sessionIds } }).lean();

export const revokeAll = (userId: string) => SessionModel.deleteMany({ userId }).lean();

export const get = {
  byUserId: (userId: string) => SessionModel.find({ userId }).lean(),
};
