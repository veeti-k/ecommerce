import { styled } from "../stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "100%",
  maxWidth: "400px",

  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",

  backgroundColor: "white",
  borderRadius: "0.5rem",
});
