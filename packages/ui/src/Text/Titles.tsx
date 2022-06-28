import { styled } from "../stitches.config";

export const H1 = styled("h1", {
  fontSize: "1.4rem",
  lineHeight: "1.4rem",
  fontWeight: 400,
  color: "$hiContrast",

  transition: "$default",
  transitionProperty: "color",

  "@bp2": {
    fontSize: "2rem",
    lineHeight: "2rem",
  },
});

export const H2 = styled("h2", {
  fontSize: "1.2rem",
  lineHeight: "1.2rem",
  fontWeight: 400,
  color: "$hiContrast",

  transition: "$default",
  transitionProperty: "color",

  "@bp2": {
    fontSize: "1.4rem",
    lineHeight: "1.4rem",
  },
});

export const H3 = styled("h3", {
  fontSize: "1rem",
  lineHeight: "1rem",
  fontWeight: 400,
  color: "$hiContrast",

  transition: "$default",
  transitionProperty: "color",

  "@bp2": {
    fontSize: "1.2rem",
    lineHeight: "1.2rem",
  },
});

export const PageTitle = styled("h1", {
  fontSize: "1.4rem",
  lineHeight: "1.4rem",
  fontWeight: 400,
  color: "$hiContrast",

  transition: "$default",
  transitionProperty: "color",

  "@bp2": {
    fontSize: "1.6rem",
    lineHeight: "1.6rem",
  },

  "@bp3": {
    fontSize: "2rem",
    lineHeight: "2rem",
  },
});

export const CardTitle = styled("h2", {
  fontSize: "1.2rem",
  lineHeight: "1.6rem",
  fontWeight: 400,
  color: "$hiContrast",

  transition: "$default",
  transitionProperty: "color",

  "@bp2": {
    fontSize: "1.4rem",
  },
});

export const DialogTitle = styled("h1", {
  all: "unset",
  fontSize: "0.9rem",
  lineHeight: "1.5rem",
  color: "$hiContrast",
  fontWeight: "normal",

  transition: "$default",
  transitionProperty: "color",

  "@bp2": {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
});
