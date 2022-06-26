import { styled } from "./stitches.config";

export const PageTitleContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",

  padding: "0.7rem",

  "@bp2": {
    padding: "0.7rem 0",
  },

  "@bp3": {
    padding: "1rem 0",
  },
});
