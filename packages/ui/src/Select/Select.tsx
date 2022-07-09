import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { FlexDiv } from "../FlexDiv";
import { Label } from "../Label/Label";
import { StyledSelect } from "./Select.styles";

interface Props extends React.ComponentProps<"select"> {
  defaultValue?: string;
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ children, label, error, required, ...rest }, ref) => {
    const shouldRenderLabelContainer = !!label || !!error;

    return (
      <FlexDiv column gap05>
        {shouldRenderLabelContainer && (
          <FlexDiv justifyBetween alignCenter>
            {!!label && <Label required={required}>{label}</Label>}

            {!!error && <Label red>{error}</Label>}
          </FlexDiv>
        )}

        <StyledSelect required={required} {...rest} ref={ref}>
          {children}
        </StyledSelect>
      </FlexDiv>
    );
  }
);
