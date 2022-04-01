import { createContext, FC, useReducer } from "react";
import { logger } from "../utils/logger";
import { Action, Actions, IUserState, MyDispatch } from "./types";

export const initState: IUserState = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  flags: 0,
  createdAt: "",
  addresses: [],
  sessions: [],
};

const userReducer = (state: IUserState, action: Action) => {
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
  state: IUserState;
  dispatch: MyDispatch;
}>({
  state: initState,
  dispatch: () => null,
});
