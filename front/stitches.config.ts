import { createStitches } from "@stitches/react";

export const { styled, css, getCssText } = createStitches({
  media: {
    mobileAndUp: "(min-width: 690px)",
    tabletAndUp: "(min-width: 1060px)",
  },
  theme: {
    transitions: {
      buttonHover: "all 0.15s cubic-bezier(0,0,.5,1)",
    },
    shadows: {
      shadowFar: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      shadowNear: "2px 4px 16px rgb(0 0 0 / 16%)",
      shadowNearest: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
  },
});
