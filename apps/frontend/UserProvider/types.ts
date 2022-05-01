import { Dispatch } from "react";
import { User } from "../types/User";
import { Status } from "./provider";

export enum Actions {
  SetUser = "SET_USER",
  ClearUser = "CLEAR_USER",
  SetStatus = "SET_STATUS",
}

export type Action =
  | { type: Actions.SetUser; payload: User }
  | { type: Actions.ClearUser }
  | { type: Actions.SetStatus; payload: Status };

export type MyDispatch = Dispatch<Action>;
