import { createContext, FC, useReducer } from "react";
import { User } from "../types/User";
import { logger } from "../utils/logger";
import { Action, Actions, MyDispatch } from "./types";

export type Status = "loading" | "loaded" | "empty" | "error";

type State = User & {
  status: Status;
};

export const initState: State = {
  userId: "",
  name: "",
  email: "",
  phoneNumber: "",
  flags: 0,
  createdAt: "",
  addresses: [],
  sessions: [],
  status: "empty",
};

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.SetUser:
      logger.log(`[REDUCER] - setting user: `, action.payload);
      return {
        ...state,
        ...action.payload,
      };

    case Actions.ClearUser:
      logger.log(`[REDUCER] - clearing user`);
      return {
        ...initState,
      };

    case Actions.SetStatus:
      logger.log(`[REDUCER] - setting state status: `, action.payload);
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const UserContext = createContext<{
  state: State;
  dispatch: MyDispatch;
}>({
  state: initState,
  dispatch: () => null,
});
