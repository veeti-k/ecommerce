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

  transition: "$default",

  "&:focus-visible": {
    boxShadow: "$focusVisible",
  },

  "@hover": {
    "&:hover": { backgroundColor: "$gray6" },
  },
});

export const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  width: 15,
  height: 20,
});
