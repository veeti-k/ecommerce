import { createStitches } from "@stitches/react";

export const { styled, css, getCssText } = createStitches({
  media: {
    mobile: "(max-width: 690px)",
    tablet: "(max-width: 1060px)",
  },
});
