import { createContext, Dispatch, FC, useReducer } from "react";

import { User, UserActions, userReducer } from "./reducers/userReducer";

export type initState = {
  user: User;
};

const initState: initState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    flags: "",
    createdAt: "",
    addresses: [],
    sessions: [],
  },
};

const combinedReducer = ({ user }: initState, action: UserActions) => ({
  user: userReducer(user, action),
});

export const GlobalStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducer, initState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const GlobalStateContext = createContext<{
  state: initState;
  dispatch: Dispatch<UserActions>;
}>({
  state: initState,
  dispatch: () => null,
});
