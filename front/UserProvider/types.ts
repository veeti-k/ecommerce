import { Dispatch } from "react";
import { User } from "../types/User";

export enum Actions {
  SetUser = "SET_USER",
  ClearUser = "CLEAR_USER",
}

export type Action = { type: Actions.SetUser; payload: User } | { type: Actions.ClearUser };

export type MyDispatch = Dispatch<Action>;
