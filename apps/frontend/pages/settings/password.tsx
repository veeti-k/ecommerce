import { Button, Divider } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useContext } from "react";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import { CardContent } from "../../components/Card";
import { CardContentWrapper, FlexDiv } from "../../components/Containers";
import { PasswordChangeForm } from "../../components/Forms/PasswordChangeForm";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { Heading, Text } from "../../components/Text";
import { ResolvedCategory } from "../../types/Category";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";

const Password: NextPage<Props> = ({ resolvedCategories }) => {
  const { state: bpState } = useContext(BreakpointContext);
  const mobile = bpState.bp === "mobile";

  const onSubmit = async (values: any) => {};

  return (
    <SettingsPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <div>
          <Heading>Password</Heading>
          <Text light>Change your password</Text>
        </div>
      </TitleContainer>

      <CardContentWrapper>
        <CardContent>
          <FlexDiv column gap08={mobile}>
            <PasswordChangeForm onSubmit={onSubmit} />

            <Divider orientation="horizontal" />

            <FlexDiv spaceBetween align>
              <div>
                <Heading>Forgot your password?</Heading>
                <Text light>Let&#39;s reset it</Text>
              </div>

              <Button>Reset password</Button>
            </FlexDiv>
          </FlexDiv>
        </CardContent>
      </CardContentWrapper>
    </SettingsPageLayout>
  );
};

export default Password;

type Props = {
  resolvedCategories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  return {
    props: {
      resolvedCategories,
    },
  };
};
