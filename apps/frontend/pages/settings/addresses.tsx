import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { CardContent } from "../../components/Card";
import { Heading } from "../../components/Text";
import { NewAddressDialog } from "../../components/Dialogs/Address/NewAddressDialog";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { CardContentWrapper, FlexDiv } from "../../components/Containers";
import { ResolvedCategory } from "../../types/Category";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";
import { Addresses } from "../../components/pages/settings/addresses/Addresses";

export const AddressesPage: NextPage<Props> = ({ resolvedCategories }) => (
  <SettingsPageLayout categories={resolvedCategories}>
    <TitleContainer withButton>
      <Heading>Addresses</Heading>

      <NewAddressDialog />
    </TitleContainer>

    <CardContentWrapper scrollableMaxHeigth="calc(100vh - 16rem)">
      <CardContent>
        <FlexDiv fullWidth column gap05>
          <Addresses />
        </FlexDiv>
      </CardContent>
    </CardContentWrapper>
  </SettingsPageLayout>
);

export default AddressesPage;

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
