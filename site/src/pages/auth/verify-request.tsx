import { CenteredTextCard, FlexDiv, H1, H3, styled } from "@ecommerce/ui";
import { Checkmark } from "@ecommerce/ui";
import { NextPage } from "next";

const Div = styled("div", {
  width: "100vw",
  height: "80vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CheckmarkDiv = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  paddingTop: "1rem",
  paddingBottom: "2.5rem",
});

const VerifyRequestPage: NextPage = () => (
  <Div>
    <CenteredTextCard>
      <FlexDiv column>
        <CheckmarkDiv>
          <Checkmark />
        </CheckmarkDiv>

        <H1>Check your email</H1>

        <H3>A sign in link has been sent there.</H3>
      </FlexDiv>
    </CenteredTextCard>
  </Div>
);

export default VerifyRequestPage;
