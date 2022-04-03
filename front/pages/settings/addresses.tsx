import { Button, Tooltip } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useContext } from "react";
import { Card } from "../../components/Card";
import { TrashIcon } from "../../components/Icons";
import { Grid, TitleContainer } from "../../components/pages/Settings";
import { Heading, Paragraph } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { useGetMe } from "../../hooks/useGetMe";
import { styled } from "../../stitches.config";
import { EditAddressDialog } from "../../components/Dialogs/EditAddressDialog";
import { NewAddressDialog } from "../../components/Dialogs/NewAddressDialog";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";
import { toast } from "react-hot-toast";
import { getMe } from "../../utils/logout";
import { SettingsPageLayout } from "../../components/layouts/SettingsPageLayout";
import { ResolvedCategory } from "../../types";
import { getCategories_STATIC_PROPS } from "../../utils/getStaticProps";

const AddressCard = styled(Card, {
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
  padding: "1rem",
});

const AddressCardButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

type Result = {
  categories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      categories,
    },
  };
};

export const Addresses: NextPage<Result> = ({ categories }) => {
  useGetMe();

  const { state, dispatch } = useContext(UserContext);

  const removeAddress = async (id: string) => {
    const notifId = toast.loading("Removing the address");
    const res = await request({
      method: "DELETE",
      path: apiRoutes.user.addresses.address("me", id),
    });

    toast.dismiss(notifId);

    if (res) {
      toast.success("Address removed");
      getMe(dispatch);
    }
  };

  return (
    <SettingsPageLayout categories={categories}>
      <TitleContainer>
        <div>
          <Heading>Addresses</Heading>
          <Paragraph light>Add or edit your addresses</Paragraph>
        </div>

        <NewAddressDialog />
      </TitleContainer>

      <Grid col2>
        {state.addresses.map((address) => (
          <AddressCard key={address.id}>
            <div>
              <div style={{ paddingBottom: "0.3rem" }}>
                <Paragraph bold>{address.name}</Paragraph>
                <Paragraph>{address.line1}</Paragraph>
                {address.line2 ? <Paragraph>{address.line2}</Paragraph> : null}
                <Paragraph>
                  {address.zip} {address.city}
                </Paragraph>
                <Paragraph>{address.state}</Paragraph>
              </div>

              <div>
                <Paragraph bold>{address.email}</Paragraph>
                <Paragraph bold>{address.phoneNumber}</Paragraph>
              </div>
            </div>
            <AddressCardButtons>
              <EditAddressDialog />

              <Tooltip label="Delete address">
                <Button colorScheme="red" size="sm" onClick={() => removeAddress(address.id)}>
                  <TrashIcon />
                </Button>
              </Tooltip>
            </AddressCardButtons>
          </AddressCard>
        ))}
      </Grid>
    </SettingsPageLayout>
  );
};

export default Addresses;
