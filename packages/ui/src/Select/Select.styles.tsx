import * as SelectPrimitive from "@radix-ui/react-select";

import { css, styled } from "../stitches.config";

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  appearance: "none",
  "-webkit-tap-highlight-color": "transparent",

  borderRadius: "8px",
  padding: "0.6rem 0.7rem",

  transition: "$default",

  "&:focus-visible": {
    outline: "none",
    boxShadow: `0 0 0 3px $colors$blue7`,
  },

  border: "1px solid $gray7",

  "@hover": {
    "&:hover": {
      backgroundColor: "$gray4",
    },
  },

  "&:active": {
    backgroundColor: "$gray5",
  },

  variants: {
    error: {
      true: {
        borderColor: "$tomato8",
      },
    },
  },
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  background: "$gray2",
  borderRadius: 8,
  border: "1px solid $gray6",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",

  transition: "$default",
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: "0.5rem",
});

const scrollButtonStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.6rem 0.7rem",

  cursor: "default",

  transition: "$default",
});

const StyledScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles
);

const StyledScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles
);

export const SelectRoot = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = SelectPrimitive.Icon;
export const SelectContent = StyledContent;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;
