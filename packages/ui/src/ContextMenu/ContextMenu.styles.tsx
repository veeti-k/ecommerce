import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import { styled } from "../stitches.config";

export const StyledContent = styled(ContextMenuPrimitive.Content, {
  minWidth: 220,
  overflow: "hidden",
  backgroundColor: "$gray2",
  borderRadius: 8,
  border: "1px solid $gray6",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  padding: "0.5rem",
  fontSize: 14,
});

export const itemStyles = {
  all: "unset",
  color: "$hiContrast",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  padding: "0.6rem 0.7rem",
  paddingLeft: 27,
  userSelect: "none",
  position: "relative",

  "&:focus": {
    backgroundColor: "$gray5",
  },

  "&[data-state=active]": {
    backgroundColor: "$gray6",
    pointerEvents: "none",
  },

  "&[data-disabled]": {
    color: "$gray6",
    pointerEvents: "none",
  },
};

export const ContextMenuRoot = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuContent = StyledContent;
