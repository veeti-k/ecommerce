import { styled } from "../stitches.config";

export const Button = styled("button", {
  all: "unset",
  appearance: "none",
  "-webkit-appearance": "none",
  "-webkit-tap-highlight-color": "transparent",

  color: "$hiContrast",

  borderRadius: "8px",
  padding: "0.5rem 0.7rem",

  transition: "$default",
  transitionProperty: "background, color, box-shadow, border",

  "&:focus-visible": {
    boxShadow: `0 0 0 3px $colors$blue7`,
  },

  "&:disabled": {
    color: "$gray7",
  },

  variants: {
    color: {
      red: {
        color: "white",
        backgroundColor: "$red9",

        "@hover": {
          "&:hover": {
            backgroundColor: "$red10",
          },
        },

        "&:active": {
          backgroundColor: "$red11",
        },

        "&:disabled": {
          backgroundColor: "$red5",
        },
      },
      green: {
        color: "white",
        backgroundColor: "$grass9",

        "@hover": {
          "&:hover": {
            backgroundColor: "$grass10",
          },
        },

        "&:active": {
          backgroundColor: "$grass11",
        },

        "&:disabled": {
          backgroundColor: "$grass5",
        },
      },
      blue: {
        color: "white",
        backgroundColor: "$blue9",

        "@hover": {
          "&:hover": {
            backgroundColor: "$blue10",
          },
        },

        "&:active": {
          backgroundColor: "$blue11",
        },

        "&:disabled": {
          backgroundColor: "$blue5",
        },
      },
      default: {},
    },
    variant: {
      subtle: {
        border: "unset",

        "@hover": {
          "&:hover": {
            backgroundColor: "$gray4",
          },
        },

        "&:active": {
          backgroundColor: "$gray5",
        },
      },
      subtle2: {
        border: "unset",

        "@hover": {
          "&:hover": {
            backgroundColor: "$gray5",
          },
        },

        "&:active": {
          backgroundColor: "$gray6",
        },
      },
      outline: {
        border: "1px solid $gray7",

        "@hover": {
          "&:hover": {
            backgroundColor: "$gray4",
          },
        },

        "&:active": {
          backgroundColor: "$gray5",
        },
      },
    },

    small: {
      true: {
        padding: "0 0.5rem",
        height: "35px",
        fontSize: "0.875rem",
      },
    },

    icon: {
      true: {
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },

  defaultVariants: {
    variant: "outline",
    color: "default",
  },
});
