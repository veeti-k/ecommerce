import { Menu2 } from "tabler-icons-react";

import { styled } from "../stitches.config";
import { SharedStyles } from "./Styles";

const Inner = styled(Menu2, {
  ...SharedStyles,
});

interface Props extends React.ComponentProps<typeof Inner> {}

export const MenuIcon = ({ ...props }: Props) => (
  <Inner size={23} strokeWidth={1} {...props} />
);
