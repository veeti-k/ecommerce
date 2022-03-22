import { styled } from "../stitches.config";

export const InputContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gap: "0.8rem 0",
  alignItems: "center",
  justifyItems: "flex-end",

  "@mobile": {
    gridTemplateColumns: "1fr",
  },

  variants: {
    column: {
      true: {
        gridTemplateColumns: "1fr",
        justifyItems: "flex-start",
      },
    },
  },
});
