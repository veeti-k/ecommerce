import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import { FlexDiv } from "../FlexDiv";
import { Label } from "../Label/Label";
import {
  SelectContent,
  SelectIcon,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "./Select.styles";

interface Props extends React.ComponentProps<typeof SelectRoot> {
  defaultValue?: string;
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  required?: boolean;
}

export const Select = ({
  children,
  label,
  error,
  required,
  ...rest
}: Props) => {
  const shouldRenderLabelContainer = !!label || !!error;

  return (
    <FlexDiv column gap05>
      {shouldRenderLabelContainer && (
        <FlexDiv justifyBetween alignCenter>
          {!!label && <Label required={required}>{label}</Label>}

          {!!error && <Label red>{error}</Label>}
        </FlexDiv>
      )}

      <SelectRoot {...rest}>
        <SelectTrigger error={!!error}>
          <FlexDiv gap05 justifyBetween alignCenter>
            <SelectValue />
            <SelectIcon>
              <ChevronDownIcon />
            </SelectIcon>
          </FlexDiv>
        </SelectTrigger>

        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>

          <SelectViewport>{children}</SelectViewport>

          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectRoot>
    </FlexDiv>
  );
};
