import { DocumentStuff } from "../documentStuff";

export interface ISession {
  userId: string;
  lastUsedAt: Date;
}

export type SessionDocument = ISession & DocumentStuff;
