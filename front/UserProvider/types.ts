import { Dispatch } from "react";
import { Address } from "../types";

interface Session {
  id: string;
  createdAt: string;
  lastUsedAt: string;
  isCurrentSession: boolean;
}

export interface IUserState {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  flags: number;
  createdAt: string;
  addresses: Address[];
  sessions: Session[];
}

export enum Actions {
  SetUser = "SET_USER",
  ClearUser = "CLEAR_USER",
}

export type Action = { type: Actions.SetUser; payload: IUserState } | { type: Actions.ClearUser };

export type MyDispatch = Dispatch<Action>;
