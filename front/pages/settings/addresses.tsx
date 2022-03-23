import { Button, Tooltip } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";
import { Card } from "../../components/Card";
import { TrashIcon } from "../../components/Icons";
import { Layout } from "../../components/layouts/Layout";
import {
  Content,
  Grid,
  MainGrid,
  PageSelectorButtons,
  TempCard,
  TitleAndLogout,
  TitleContainer,
} from "../../components/pages/Settings";
import { Heading, Paragraph } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { styled } from "../../stitches.config";
import { EditAddressDialog } from "../../components/Dialogs/EditAddressDialog";
import { NewAddressDialog } from "../../components/Dialogs/NewAddressDialog";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";
import { toast } from "react-hot-toast";
import { toastOptions } from "../../utils/consts";

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

export const Addresses: NextPage = () => {
  const isLoggedIn = useIsLoggedIn();
  useGetMe();

  const { state } = useContext(UserContext);

  const removeAddress = async (id: string) => {
    const res = await request({
      method: "DELETE",
      path: apiRoutes.user.addresses.address("me", id),
    });

    if (res) toast.success("Address removed", toastOptions);
  };

  return (
    <Layout>
      {isLoggedIn ? (
        <>
          <TitleAndLogout />
          <TempCard>
            <MainGrid>
              <PageSelectorButtons activePage="addresses" />
              <Content>
                <TitleContainer>
                  <div>
                    <Heading>Addresses</Heading>
                    <Paragraph light>Add or edit your addresses</Paragraph>
                  </div>

                  <NewAddressDialog />
                </TitleContainer>

                <Grid>
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
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => removeAddress(address.id)}
                          >
                            <TrashIcon />
                          </Button>
                        </Tooltip>
                      </AddressCardButtons>
                    </AddressCard>
                  ))}
                </Grid>
              </Content>
            </MainGrid>
          </TempCard>
        </>
      ) : null}
    </Layout>
  );
};

export default Addresses;
