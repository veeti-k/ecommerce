import * as SelectPrimitive from "@radix-ui/react-select";

import { styled } from "../stitches.config";

export const StyledSelectOption = styled(SelectPrimitive.Item, {
  all: "unset",
  color: "$hiContrast",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  padding: "0.6rem 0.7rem",
  userSelect: "none",
  position: "relative",

  "&:focus": {
    backgroundColor: "$gray5",
  },

  "&[data-state=active]": {
    backgroundColor: "$gray6",
    pointerEvents: "none",
  },

  "&[data-disabled]": {
    color: "$gray6",
    pointerEvents: "none",
  },
});
