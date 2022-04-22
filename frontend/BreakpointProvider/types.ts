import { Dispatch } from "react";

export type BreakpointContextState = {
  bp: "mobile" | "tablet" | "desktop";
};

export enum BreakpointContextActions {
  SetBreakpoint = "SET_BREAKPOINT",
}

export type BreakpointContextAction = {
  type: BreakpointContextActions.SetBreakpoint;
  payload: BreakpointContextState;
};

export type BreakpointContextDispatch = Dispatch<BreakpointContextAction>;
