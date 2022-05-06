import { Tooltip } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useContext } from "react";
import { Card, CardContent } from "../../components/Card";
import { Heading, Text } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { styled } from "../../stitches.config";
import { EditAddressDialog } from "../../components/Dialogs/Address/EditAddressDialog";
import { NewAddressDialog } from "../../components/Dialogs/Address/NewAddressDialog";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../components/Containers";
import { DeleteAddressDialog } from "../../components/Dialogs/Address/DeleteAddressDialog";
import { ResolvedCategory } from "../../types/Category";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";

const AddressCard = styled(Card, {
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
  padding: "1rem",
  width: "100%",
});

export const Addresses: NextPage<Props> = ({ resolvedCategories }) => {
  const { state } = useContext(UserContext);

  return (
    <SettingsPageLayout activePage="addresses" categories={resolvedCategories}>
      <TitleContainer>
        <div>
          <Heading>Addresses</Heading>
        </div>

        <NewAddressDialog />
      </TitleContainer>
      <MgmtSettingsPageScrollableContent style={{ maxHeight: "calc(100vh - 16rem)" }}>
        <CardContent>
          <FlexDiv fullWidth column gap05>
            {state.addresses.map((address) => (
              <AddressCard key={address.addressId}>
                <FlexDiv column>
                  <FlexDiv column gap0>
                    <Text bold>{address.name}</Text>
                    <Text>{address.streetAddress}</Text>
                    <Text>
                      {address.zip} {address.city}
                    </Text>
                    <Text>{address.state}</Text>
                  </FlexDiv>

                  <FlexDiv column gap0>
                    <Text bold>{address.email}</Text>
                    <Text bold>{address.phoneNumber}</Text>
                  </FlexDiv>
                </FlexDiv>
                <FlexDiv column gap05>
                  <EditAddressDialog address={address} />

                  <Tooltip label="Delete address">
                    <DeleteAddressDialog address={address} />
                  </Tooltip>
                </FlexDiv>
              </AddressCard>
            ))}
          </FlexDiv>
        </CardContent>
      </MgmtSettingsPageScrollableContent>
    </SettingsPageLayout>
  );
};

export default Addresses;

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
