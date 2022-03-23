import { styled } from "../stitches.config";

export const InputContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gap: "0.8rem 0",
  alignItems: "center",
  justifyItems: "flex-end",

  "@mobile": {
    gridTemplateColumns: "1fr",
  },

  variants: {
    column: {
      true: {
        gridTemplateColumns: "1fr",
        justifyItems: "flex-start",
      },
    },
  },
});

export const FormWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",

  gap: "1rem",
  paddingTop: "1.75rem",
});

export const VerticalGrid = styled("div", {
  overflowX: "auto",
  display: "flex",
  gap: "1rem",
  paddingBottom: "0.5rem",
});

export const MainGrid = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const FlexDiv = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",

  variants: {
    align: {
      true: {
        alignItems: "center",
      },
    },
    justify: {
      true: {
        justifyContent: "center",
      },
    },
    spaceBetween: {
      true: {
        justifyContent: "space-between",
      },
    },
    flexEnd: {
      true: {
        justifyContent: "flex-end",
      },
    },
    gap05: {
      true: {
        gap: "0.5rem",
      },
    },
    gap1: {
      true: {
        gap: "1rem",
      },
    },
  },
});
