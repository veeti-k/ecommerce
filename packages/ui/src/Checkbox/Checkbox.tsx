import { useId } from "@mantine/hooks";
import { CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { FlexDiv } from "../FlexDiv";
import { Label } from "../Label/Label";
import { StyledCheckbox, StyledIndicator } from "./Checkbox.styles";

interface Props extends React.ComponentProps<typeof StyledCheckbox> {
  label: string;
}

export const Checkbox = ({ children, label, id, ...rest }: Props) => {
  const innerId = useId(id);

  return (
    <FlexDiv gap05 alignCenter>
      <StyledCheckbox aria-label={label} id={innerId} {...rest}>
        <StyledIndicator>
          <CheckIcon />
        </StyledIndicator>

        {children}
      </StyledCheckbox>

      <Label htmlFor={innerId}>{label}</Label>
    </FlexDiv>
  );
};
