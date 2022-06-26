import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { styled } from "../stitches.config";

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: "unset",

  backgroundColor: "$gray5",
  width: 25,
  height: 25,

  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 2px 10px $colors$blackA7`,

  transition: "$background",

  "&:focus-visible": {
    outline: "none",
    boxShadow: `0 0 0 3px $colors$blue7`,
  },

  "@hover": {
    "&:hover": { backgroundColor: "$gray6" },
  },
});

export const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: "$hiContrast",
  width: 15,
  height: 20,
});
