import { styled } from "../stitches.config";

export const Card = styled("div", {
  width: "100%",

  backgroundColor: "white",
  borderRadius: "8px",

  transition: "all .3s cubic-bezier(0,0,.5,1)",
});

export const AuthPageCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
});

export const ProductCard = styled(Card, {
  boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",

  padding: "1rem",
  maxWidth: "300px",
  minHeight: "400px",
  minWidth: "250px",

  "&:hover": {
    boxShadow: "2px 4px 16px rgb(0 0 0 / 16%)",
  },
});
