import * as React from "react";

import { FlexDiv } from "../FlexDiv";
import { Label } from "../Label/Label";
import { useRandomId } from "../_utils/use-random-id";
import { InputProps, StyledInput } from "./SharedStuff";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, id, error, fullWidth, ...props }, ref) => {
    const innerId = useRandomId(id);

    const shouldRenderLabelContainer = !!label || !!error;

    return (
      <FlexDiv column gap05 fullWidth={fullWidth}>
        {shouldRenderLabelContainer && (
          <FlexDiv justifyBetween alignCenter>
            {!!label && (
              <Label htmlFor={id} required={required}>
                {label}
              </Label>
            )}

            {!!error && (
              <Label htmlFor={id} red>
                {error}
              </Label>
            )}
          </FlexDiv>
        )}

        <StyledInput
          ref={ref}
          invalid={!!error}
          id={innerId}
          required={required}
          {...props}
        />
      </FlexDiv>
    );
  }
);
