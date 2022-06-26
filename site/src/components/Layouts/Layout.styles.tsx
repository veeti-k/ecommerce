import { styled } from "@ecommerce/ui";

export const LayoutMain = styled("main", {
  maxWidth: "1200px",
  margin: "0 auto",
  paddingTop: "3.5rem",
  paddingBottom: "0.5rem",
  transition: "$background",
  boxSizing: "border-box",

  zIndex: 1,

  "@bp2": {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "3.5rem",
  },

  "@bp3": {
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingTop: "5rem",
  },
});
