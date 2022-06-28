import { styled } from "../stitches.config";

export const StyledCard = styled("div", {
  boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
  borderRadius: "6px",
  position: "relative",

  transition: "$default",

  background: "$gray2",

  variants: {
    variant: {
      outline: {
        border: "1px solid $gray5",
      },

      error: {
        background: "$tomato6",
      },
    },
  },

  defaultVariants: {
    variant: "outline",
  },
});

export const StyledCardContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "0.7rem",
  height: "100%",

  "@bp2": {
    gap: "0.7rem",
  },

  "@bp3": {
    gap: "0.9rem",
    padding: "0.9rem",
  },
});
