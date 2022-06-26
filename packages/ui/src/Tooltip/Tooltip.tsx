import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { StyledContent } from "./Tooltip.styles";

interface Props {
  children: React.ReactNode;
  label: string;
}

export const Tooltip = ({ children, label }: Props) => (
  <TooltipPrimitive.Root delayDuration={0}>
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

    <StyledContent sideOffset={5}>{label}</StyledContent>
  </TooltipPrimitive.Root>
);
