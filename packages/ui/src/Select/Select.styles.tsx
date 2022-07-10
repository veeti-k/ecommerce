import { styled } from "../stitches.config";

export const StyledSelect = styled("select", {
  all: "unset",

  transition: "$default",

  fontSize: "16px",

  borderRadius: 8,
  border: "1px solid $colors$gray7",

  display: "flex",
  alignItems: "center",

  height: "2.5rem",
  padding: "0 0.5rem",

  "@hover": {
    "&:hover": {
      borderColor: "$colors$gray9",
    },
  },

  "&:focus": {
    outline: "none",
    boxShadow: "$focusVisible",
    borderColor: "$colors$blue9",
  },

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },

    invalid: {
      true: {
        borderColor: "$tomato8",

        "@hover": {
          "&:hover": {
            borderColor: "$colors$tomato9",
          },
        },

        "&:focus": {
          outline: "none",
          boxShadow: `0 0 0 3px $colors$tomato8`,
          borderColor: "$colors$tomato9",
        },
      },
    },
  },
});
