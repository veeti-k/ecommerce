import { ChevronRight } from "tabler-icons-react";

import { styled } from "../stitches.config";
import { SharedStyles } from "./Styles";

const Inner = styled(ChevronRight, {
  ...SharedStyles,
});

interface Props extends React.ComponentProps<typeof Inner> {}

export const ChevronRightIcon = ({ ...props }: Props) => (
  <Inner size={15} strokeWidth={1} {...props} />
);
