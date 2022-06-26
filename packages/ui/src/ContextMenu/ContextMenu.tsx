import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as React from "react";

import { styled } from "../stitches.config";
import {
  ContextMenuContent,
  ContextMenuRoot,
  ContextMenuTrigger,
  itemStyles,
} from "./ContextMenu.styles";

interface Props extends React.ComponentProps<typeof ContextMenuRoot> {
  trigger: React.ReactNode;
}

export const ContextMenu = ({ children, trigger, ...rest }: Props) => (
  <ContextMenuRoot {...rest}>
    <ContextMenuTrigger asChild>{trigger}</ContextMenuTrigger>

    <ContextMenuContent sideOffset={5}>{children}</ContextMenuContent>
  </ContextMenuRoot>
);

export const ContextMenuItem = styled(ContextMenuPrimitive.Item, {
  ...itemStyles,
});
