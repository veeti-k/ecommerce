import { styled } from "../stitches.config";

export const StyledSelect = styled("select", {
  all: "unset",
  appearance: "auto",
  "-webkit-tap-highlight-color": "transparent",

  borderRadius: "8px",
  padding: "0 0.5rem",

  transition: "$default",

  "&:focus-visible": {
    outline: "none",
    boxShadow: "$focusVisible",
  },

  border: "1px solid $gray7",
  height: "2.5rem",

  "@hover": {
    "&:hover": {
      backgroundColor: "$gray4",
    },
  },

  "&:active": {
    backgroundColor: "$gray5",
  },

  variants: {
    error: {
      true: {
        borderColor: "$tomato8",
      },
    },
  },
});
