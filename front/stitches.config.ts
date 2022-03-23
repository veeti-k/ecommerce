import { createStitches } from "@stitches/react";

export const { styled, css, getCssText } = createStitches({
  media: {
    mobile: "(max-width: 690px)",
    tablet: "(max-width: 1060px)",
  },
  theme: {
    transitions: {
      buttonHover: "all 0.15s cubic-bezier(0,0,.5,1)",
    },
  },
});
