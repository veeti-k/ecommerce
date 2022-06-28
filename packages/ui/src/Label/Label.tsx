import * as RadixLabel from "@radix-ui/react-label";

import { Text } from "../Text/Text";
import { styled } from "../stitches.config";

const StyledLabel = styled(RadixLabel.Root, {
  all: "unset",
  fontSize: "14px",
  color: "$hiContrast",

  transition: "$default",
  transitionProperty: "color",

  variants: {
    red: {
      true: {
        color: "$tomato9",
      },
    },
  },
});

interface Props extends React.ComponentProps<typeof StyledLabel> {
  required?: boolean;
  children: React.ReactNode;
}

export const Label = ({ children, required, ...props }: Props) => (
  <StyledLabel {...props}>
    {children} {!!required && <Text red>*</Text>}
  </StyledLabel>
);
