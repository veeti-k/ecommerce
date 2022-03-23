import * as RadixLabel from "@radix-ui/react-label";
import { styled } from "../stitches.config";

export const Label = styled(RadixLabel.Root, {
  fontSize: "0.9rem",
  marginRight: "1rem",
  padding: 0,
});

export const Paragraph = styled("p", {
  fontSize: "0.875rem",

  variants: {
    light: {
      true: {
        fontWeight: 300,
      },
    },

    bold: {
      true: {
        fontWeight: 700,
      },
    },
  },
});

export const Heading = styled("h1", {
  fontWeight: 700,
});

export const BigHeading = styled(Heading, {
  fontSize: "1.6rem",
});
