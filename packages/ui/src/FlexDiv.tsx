import { styled } from "./stitches.config";

export const FlexDiv = styled("div", {
  display: "flex",

  gap: "1rem",

  variants: {
    column: {
      true: {
        flexDirection: "column",
      },
    },
    gap0: {
      true: {
        gap: "0",
      },
    },
    gap05: {
      true: {
        gap: "0.5rem",
      },
    },

    alignCenter: {
      true: {
        alignItems: "center",
      },
    },
    alignStart: {
      true: {
        alignItems: "flex-start",
      },
    },
    alignEnd: {
      true: {
        alignItems: "flex-end",
      },
    },

    justifyCenter: {
      true: {
        justifyContent: "center",
      },
    },
    justifyBetween: {
      true: {
        justifyContent: "space-between",
      },
    },
    justifyStart: {
      true: {
        justifyContent: "flex-start",
      },
    },
    justifyEnd: {
      true: {
        justifyContent: "flex-end",
      },
    },

    fullHeight: {
      true: {
        height: "100%",
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});
