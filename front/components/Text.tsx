import * as RadixLabel from "@radix-ui/react-label";
import { styled } from "../stitches.config";

export const Label = styled(RadixLabel.Root, {
  fontSize: "0.9rem",
  marginRight: "1rem",
  padding: 0,
});

export const Paragraph = styled("p", {
  fontSize: "0.85rem",

  "@mobileAndUp": {
    fontSize: "0.875rem",
  },

  color: "Black",

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

export const Text = styled("span", {
  fontSize: "0.8rem",

  "@mobileAndUp": {
    fontSize: "0.875rem",
  },

  color: "Black",

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

const BaseHeading = styled("h1", {
  marginBlockStart: 0,
  marginBlockEnd: 0,
  lineHeight: 1,
  fontWeight: 700,

  variants: {
    paddingB04: {
      true: {
        paddingBottom: "0.4rem",
      },
    },
    paddingT04: {
      true: {
        paddingTop: "0.4rem",
      },
    },
  },
});

export const Heading = styled(BaseHeading, {
  marginBlockStart: 0,
  marginBlockEnd: 0,
  lineHeight: 1,
});

export const BiggerHeading = styled(BaseHeading, {
  fontSize: "1rem",

  "@mobileAndUp": {
    fontSize: "1.2rem",
  },

  "@tabletAndUp": {
    fontSize: "1.4rem",
  },
});

export const PageTitle = styled(BaseHeading, {
  fontSize: "1.6rem",
});

export const HugeHeading = styled("h1", {
  fontSize: "2.4rem",
});
