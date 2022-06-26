import { Check } from "tabler-icons-react";

import { styled } from "../stitches.config";
import { SharedStyles } from "./Styles";

const Inner = styled(Check, {
  transform: "scale(1.2)",
  ...SharedStyles,
});

interface Props extends React.ComponentProps<typeof Inner> {}

export const CheckIcon = ({ ...props }: Props) => (
  <Inner size={23} strokeWidth={1} {...props} />
);
