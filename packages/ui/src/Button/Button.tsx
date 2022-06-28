import { styled } from "../stitches.config";

export const Button = styled("button", {
  all: "unset",
  appearance: "none",
  "-webkit-appearance": "none",
  "-webkit-tap-highlight-color": "transparent",

  borderRadius: "8px",
  padding: "0.5rem 0.7rem",

  transition: "$default",

  "&:focus-visible": {
    boxShadow: "$focusVisible",
  },

  "&:disabled": {
    color: "$gray7",
  },

  variants: {
    color: {
      red: {
        color: "white",
        background: "$red9",

        "@hover": {
          "&:hover": {
            background: "$red10",
          },
        },

        "&:active": {
          background: "$red11",
        },

        "&:disabled": {
          background: "$red5",
        },
      },
      green: {
        color: "white",
        background: "$grass9",

        "@hover": {
          "&:hover": {
            background: "$grass10",
          },
        },

        "&:active": {
          background: "$grass11",
        },

        "&:disabled": {
          background: "$grass5",
        },
      },
      blue: {
        color: "white",
        background: "$blue9",

        "@hover": {
          "&:hover": {
            background: "$blue10",
          },
        },

        "&:active": {
          background: "$blue11",
        },

        "&:disabled": {
          background: "$blue5",
        },
      },
      default: {},
    },
    variant: {
      subtle: {
        border: "unset",

        "@hover": {
          "&:hover": {
            background: "$gray4",
          },
        },

        "&:active": {
          background: "$gray5",
        },
      },
      subtle2: {
        border: "unset",

        "@hover": {
          "&:hover": {
            background: "$gray5",
          },
        },

        "&:active": {
          background: "$gray6",
        },
      },
      outline: {
        border: "1px solid $gray7",

        "@hover": {
          "&:hover": {
            background: "$gray4",
          },
        },

        "&:active": {
          background: "$gray5",
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
        transition: "$defaultNoProp",
        transitionProperty: "background, border, box-shadow",
      },
    },
  },

  defaultVariants: {
    variant: "outline",
    color: "default",
  },
});
