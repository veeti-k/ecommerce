import * as SelectPrimitive from "@radix-ui/react-select";

import { StyledSelectOption } from "./Option.styles";

export const Option = ({
  children,
  ...props
}: React.ComponentProps<typeof StyledSelectOption>) => (
  <StyledSelectOption {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </StyledSelectOption>
);
