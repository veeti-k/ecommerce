import { useContext, useEffect } from "react";
import { BreakpointContextActions } from "../BreakpointProvider/types";
import { BreakpointContext } from "../BreakpointProvider/BreakpointProvider";

export const useResizeListener = () => {
  const { state, dispatch } = useContext(BreakpointContext);

  const mobileWidth = 690;
  const tabletWidth = 1060;

  const getBp = (width: number) => {
    if (width < mobileWidth) {
      return "mobile";
    } else if (width < tabletWidth) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const bp = getBp(window.innerWidth);

      if (state.bp == bp) return;

      dispatch({
        type: BreakpointContextActions.SetBreakpoint,
        payload: {
          bp: getBp(window.innerWidth),
        },
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state.bp]);
};
