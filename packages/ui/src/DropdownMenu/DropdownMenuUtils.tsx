import { CheckIcon } from "@radix-ui/react-icons";

import { DropdownMenuItemIndicator } from "./DropdownMenu";
import { StyledCheckboxItem } from "./DropdownMenu.styles";

export const DropdownMenuCheckboxItem = ({
  children,
  ...rest
}: React.ComponentProps<typeof StyledCheckboxItem>) => (
  <StyledCheckboxItem {...rest}>
    <DropdownMenuItemIndicator>
      <CheckIcon />
    </DropdownMenuItemIndicator>

    {children}
  </StyledCheckboxItem>
);
