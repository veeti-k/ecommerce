import { X } from "tabler-icons-react";

import { styled } from "../stitches.config";
import { SharedStyles } from "./Styles";

const Inner = styled(X, {
  ...SharedStyles,
});

interface Props extends React.ComponentProps<typeof Inner> {}

export const CrossIcon = ({ ...props }: Props) => (
  <Inner size={23} strokeWidth={1} {...props} />
);
