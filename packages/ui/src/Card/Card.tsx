import * as React from "react";

import { StyledCard, StyledCardContent } from "./Card.styles";

interface Props extends React.ComponentProps<typeof StyledCard> {}

export const Card = ({ children, ...rest }: Props) => (
  <StyledCard {...rest}>
    <StyledCardContent>{children}</StyledCardContent>
  </StyledCard>
);
