import { styled } from "../stitches.config";

export const Card = styled("div", {
  backgroundColor: "white",
  borderRadius: "8px",

  transition: "all .3s cubic-bezier(0,0,.5,1)",
  padding: "1rem",

  variants: {
    padding08: {
      true: {
        padding: "0.8rem",
      },
    },
  },
});

export const AuthPageCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
});

export const ProductCard = styled(Card, {
  position: "relative",
  boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)",
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "300px",

  "&:hover": {
    boxShadow: "2px 4px 16px rgb(0 0 0 / 16%)",
  },
});

export const PageCard = styled("div", {
  borderRadius: "8px",

  boxShadow: "$shadowFar",
});
