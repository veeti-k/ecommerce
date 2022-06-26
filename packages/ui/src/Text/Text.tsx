import { styled } from "../stitches.config";

export const Text = styled("span", {
  all: "unset",

  color: "$hiContrast",

  transition: "$color",

  fontSize: "0.875rem",

  "@bp1": {
    fontSize: "1rem",
  },

  variants: {
    red: {
      true: {
        color: "$tomato9",
      },
    },
    bold: {
      true: {
        fontWeight: "bold",
      },
    },
    white: {
      true: {
        color: "white",
      },
    },
  },
});
