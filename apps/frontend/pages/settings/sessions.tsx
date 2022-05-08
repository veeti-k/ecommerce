import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { CardContent } from "../../components/Card";
import { CardContentWrapper, FlexDiv } from "../../components/Containers";
import { Heading } from "../../components/Text";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { ResolvedCategory } from "../../types/Category";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";
import { Sessions } from "../../components/pages/settings/sessions/Sessions";

const SessionsPage: NextPage<Props> = ({ resolvedCategories }) => {
  return (
    <SettingsPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <Heading>Sessions</Heading>
      </TitleContainer>

      <CardContentWrapper scrollableMaxHeigth="calc(100vh - 15rem)">
        <CardContent>
          <FlexDiv column gap05>
            <Sessions />
          </FlexDiv>
        </CardContent>
      </CardContentWrapper>
    </SettingsPageLayout>
  );
};

export default SessionsPage;

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
