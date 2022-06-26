import { Edit } from "tabler-icons-react";

import { styled } from "../stitches.config";
import { SharedStyles } from "./Styles";

const Inner = styled(Edit, {
  ...SharedStyles,
});

interface Props extends React.ComponentProps<typeof Inner> {}

export const EditIcon = ({ ...props }: Props) => (
  <Inner size={23} strokeWidth={1} {...props} />
);
