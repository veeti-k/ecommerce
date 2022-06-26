import * as React from "react";

import { FlexDiv } from "../FlexDiv";
import { Text } from "../Text/Text";
import { Card } from "./Card";
import { StyledCard } from "./Card.styles";

interface Props extends React.ComponentProps<typeof StyledCard> {}

export const CenteredTextCard = ({ children, ...rest }: Props) => (
  <Card {...rest}>
    <FlexDiv justifyCenter style={{ padding: "1rem" }}>
      <Text>{children}</Text>
    </FlexDiv>
  </Card>
);
