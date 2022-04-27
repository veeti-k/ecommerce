import { createContext, FC, useReducer } from "react";
import { User } from "../types/User";
import { logger } from "../utils/logger";
import { Action, Actions, MyDispatch } from "./types";

export const initState: User = {
  userId: "",
  name: "",
  email: "",
  phoneNumber: "",
  flags: 0,
  createdAt: "",
  addresses: [],
  sessions: [],
};

const userReducer = (state: User, action: Action) => {
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
    default:
      return state;
  }
};

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const UserContext = createContext<{
  state: User;
  dispatch: MyDispatch;
}>({
  state: initState,
  dispatch: () => null,
});
