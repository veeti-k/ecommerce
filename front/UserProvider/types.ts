import { Dispatch } from "react";

interface Address {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

interface Session {
  id: string;
  createdAt: string;
  lastUsedAt: string;
  isCurrentSession: boolean;
}

export interface IUserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  flags: string;
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
