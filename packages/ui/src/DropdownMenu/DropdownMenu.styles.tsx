import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { openAnim } from "../_utils/animations";
import { css, styled } from "../stitches.config";

export const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  overflow: "hidden",
  background: "$gray2",
  borderRadius: 8,
  border: "1px solid $gray6",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  padding: "0.5rem",
  fontSize: 14,

  transition: "$default",

  ...openAnim,
});

export const itemStyles = css({
  all: "unset",

  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  padding: "0.6rem 0.7rem",
  paddingLeft: 27,
  userSelect: "none",
  position: "relative",

  transition: "$default",

  "&:focus": {
    background: "$gray5",
  },

  "&[data-state=active]": {
    background: "$gray6",
    pointerEvents: "none",
  },

  "&[data-disabled]": {
    color: "$gray6",
    pointerEvents: "none",
  },
});

export const StyledItem = styled(DropdownMenuPrimitive.Item, itemStyles);
export const StyledCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  itemStyles
);

export const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",

  transition: "$default",
});

export const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 27,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "$default",
});

export const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  background: "$gray6",
  margin: 5,

  transition: "$default",
});

export const StyledRightSlot = styled("div", {
  fontSize: 12,
  marginLeft: "auto",
  paddingLeft: 20,
  color: "$gray8",
  "[data-disabled] &": { color: "$gray6" },

  transition: "$default",
});
