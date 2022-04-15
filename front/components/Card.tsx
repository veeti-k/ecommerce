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
    padding0: {
      true: {
        padding: "0",
      },
    },
    shadowFar: {
      true: {
        boxShadow: "$shadowFar",
      },
    },
    shadowNear: {
      true: {
        boxShadow: "$shadowNearest",
      },
    },
  },
});

export const AuthPageCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
  width: "100%",
  maxWidth: "400px",
});

export const ProductCard = styled(Card, {
  position: "relative",
  boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)",
  display: "flex",
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

export const InfoCard = styled(Card, {
  boxShadow: "$shadowNearest",
  padding: "0.7rem",
  width: "100%",
});
