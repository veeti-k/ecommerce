import { useContext } from "react";
import { BreakpointContext } from "../BreakpointProvider/BreakpointProvider";

export const useBreakpoints = () => {
  const { state } = useContext(BreakpointContext);

  const mobile = state.bp === "mobile";
  const tablet = state.bp === "tablet";
  const desktop = state.bp === "desktop";

  return { mobile, tablet, desktop };
};
