import { styled } from "@ecommerce/ui";

export const AuthLayoutMain = styled("main", {
  width: "100vw",
  height: "80vh",

  display: "flex",
  justifyContent: "center",

  background: "$gray1",
  transition: "$background",
});

export const AuthLayoutContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  gap: "3rem",
  padding: "1rem",
  paddingTop: "20vh",

  background: "$gray1",
  transition: "$background",

  "@bp2": {
    minWidth: "350px",
    maxWidth: "600px",
  },
});
