import { useContext } from "react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Divider } from "@chakra-ui/react";
import { CardWrapper, FlexDiv } from "../../components/Containers";
import { Heading, Text } from "../../components/Text";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { DeleteAccountDialog } from "../../components/Dialogs/Account/DeleteAccountDialog";
import { ResolvedCategory } from "../../types/Category";
import { CardContent } from "../../components/Card";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import { AccountUpdateForm } from "../../components/Forms/AccountUpdateForm";

const Account: NextPage<Props> = ({ resolvedCategories }) => {
  const { state: bpState } = useContext(BreakpointContext);
  const mobile = bpState.bp === "mobile";

  return (
    <SettingsPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <div>
          <Heading>General Info</Heading>
        </div>
      </TitleContainer>

      <CardWrapper>
        <CardContent>
          <FlexDiv column gap08={mobile}>
            <AccountUpdateForm />

            <Divider orientation="horizontal" />

            <FlexDiv spaceBetween align justify={bpState.bp === "mobile"}>
              {bpState.bp === "mobile" ? null : (
                <div>
                  <Heading>Delete account</Heading>
                  <Text light>Your account will be permanently deleted</Text>
                </div>
              )}
              <DeleteAccountDialog />
            </FlexDiv>
          </FlexDiv>
        </CardContent>
      </CardWrapper>
    </SettingsPageLayout>
  );
};

export default Account;

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
