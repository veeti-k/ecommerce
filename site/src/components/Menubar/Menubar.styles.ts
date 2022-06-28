import { styled } from "@ecommerce/ui";

export const MenubarOuter = styled("div", {
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  position: "fixed",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  background: "$gray2",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",

  transition: "$default",
});

export const MenubarInner = styled("div", {
  boxSizing: "border-box",
  flexShrink: 0,

  width: "100%",
  maxWidth: "1200px",

  padding: "0 0.5rem",
  marginRight: "var(--removed-body-scroll-bar-size)",

  "@bp3": {
    padding: "0 25px",
  },
});

export const MenubarContent = styled("div", {
  height: "3.5rem",

  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  "@bp3": {
    height: "5rem",
    gap: "1rem",
  },
});
