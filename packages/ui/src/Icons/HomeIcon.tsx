import { Home2 } from "tabler-icons-react";

import { styled } from "../stitches.config";
import { SharedStyles } from "./Styles";

const Inner = styled(Home2, {
  ...SharedStyles,
});

interface Props extends React.ComponentProps<typeof Inner> {}

export const HomeIcon = ({ ...props }: Props) => (
  <Inner size={23} strokeWidth={1} {...props} />
);
