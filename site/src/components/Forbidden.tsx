import { FlexDiv, H1, Text } from "@ecommerce/ui";

export const Forbidden = () => (
  <FlexDiv
    alignCenter
    justifyCenter
    style={{
      width: "100vw",
      height: "100vh",
    }}
  >
    <H1>403 Forbidden</H1>
    <Text>{"You don't have sufficient permissions to do that"}</Text>
  </FlexDiv>
);
