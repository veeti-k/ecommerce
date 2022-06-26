import { styled } from "../stitches.config";
import { Button } from "./Button";

export const ButtonGroup = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  [`& ${Button}:first-child`]: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    borderRight: "1px solid $colors$blackA4",
  },

  [`& ${Button}:last-child`]: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  variants: {
    many: {
      true: {
        [`& ${Button}:not(:last-child):not(:first-child)`]: {
          borderRadius: 0,
        },

        [`& ${Button}:last-child`]: {
          borderLeft: "1px solid $colors$blackA4",
        },
      },
    },
  },
});
