import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { PopoverContent } from "./Popover.styles";

interface Props extends React.ComponentProps<typeof PopoverRoot> {
  trigger: React.ReactNode;
}

export const Popover = ({ trigger, children, ...rest }: Props) => (
  <PopoverRoot {...rest}>
    <PopoverTrigger asChild>{trigger}</PopoverTrigger>

    <PopoverContent sideOffset={5}>{children}</PopoverContent>
  </PopoverRoot>
);

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
