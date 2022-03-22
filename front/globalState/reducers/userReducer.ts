import { logger } from "../../utils/logger";
import { ActionMap } from "../types";

export enum UserActionTypes {
  SetUser = "SET_USER",
}

export type Address = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
};

export type Session = {
  id: string;
  createdAt: string;
  lastUsedAt: string;
  isCurrentSession: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  flags: string;
  createdAt: string;
  addresses: Address[];
  sessions: Session[];
};

type UserPayload = {
  [UserActionTypes.SetUser]: User;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const userReducer = (state: User, action: UserActions) => {
  logger.log(`[REDUCER] - userReducer - [${action.type}]`, action.payload);

  switch (action.type) {
    case UserActionTypes.SetUser:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
