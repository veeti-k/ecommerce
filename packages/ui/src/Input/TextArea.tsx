import * as React from "react";

import { FlexDiv } from "../FlexDiv";
import { Label } from "../Label/Label";
import { useRandomId } from "../_utils/use-random-id";
import { StyledTextArea, TextAreaProps } from "./SharedStuff";

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, required, id, error, fullWidth, ...props }, ref) => {
    const innerId = useRandomId(id);

    return (
      <FlexDiv column gap05 fullWidth={fullWidth}>
        <LabelAndError id={innerId} label={label} error={error} />

        <StyledTextArea
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

interface LabelAndErrorProps {
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  required?: boolean;
  id?: string;
}

const LabelAndError = ({ label, error, required, id }: LabelAndErrorProps) => {
  if (!label || !error || !id) return null;

  return (
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
  );
};
