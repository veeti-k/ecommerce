import { createContext, FC, ReactNode, useReducer } from "react";
import { logger } from "../utils/logger";
import {
  BreakpointContextState,
  BreakpointContextActions,
  BreakpointContextDispatch,
  BreakpointContextAction,
} from "./types";

export const initState: BreakpointContextState = {
  bp: "mobile",
};

const breakpointReducer = (state: BreakpointContextState, action: BreakpointContextAction) => {
  switch (action.type) {
    case BreakpointContextActions.SetBreakpoint:
      logger.log(`[REDUCER] - setting breakpoint context: `, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const BreakpointContext = createContext<{
  state: BreakpointContextState;
  dispatch: BreakpointContextDispatch;
}>({
  state: initState,
  dispatch: () => null,
});

export const BreakpointProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(breakpointReducer, initState);

  return (
    <BreakpointContext.Provider value={{ state, dispatch }}>{children}</BreakpointContext.Provider>
  );
};
