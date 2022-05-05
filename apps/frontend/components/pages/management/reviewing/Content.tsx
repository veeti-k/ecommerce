import { FC, ReactNode, useContext } from "react";
import { BreakpointContext } from "../../../../BreakpointProvider/BreakpointProvider";
import { MgmtSettingsPageScrollableContent } from "../../../Containers";

export const ReviewingPageContent: FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useContext(BreakpointContext);

  if (state.bp === "mobile") return <>{children}</>;

  return <MgmtSettingsPageScrollableContent>{children}</MgmtSettingsPageScrollableContent>;
};
