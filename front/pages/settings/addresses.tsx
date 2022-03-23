import { Button, Text, Tooltip } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";
import { Edit, Trash2 } from "react-feather";
import { Card } from "../../components/Card";
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
import { GlobalStateContext } from "../../globalState/store";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { styled } from "../../stitches.config";

const AddressCard = styled(Card, {
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
  padding: "1rem",
  maxWidth: "300px",
});

const AddressCardButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const Addresses: NextPage = () => {
  const isLoggedIn = useIsLoggedIn();
  useGetMe();

  const { state } = useContext(GlobalStateContext);

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
                  <Text fontWeight="bold">Addresses</Text>
                  <Text fontWeight="light" fontSize="sm">
                    Make changes to your addresses
                  </Text>
                </TitleContainer>

                <Grid>
                  {state.user.addresses.map((address) => (
                    <AddressCard>
                      <div>
                        <div style={{ paddingBottom: "0.3rem" }}>
                          <Text fontWeight="bold" fontSize="sm">
                            {address.name}
                          </Text>
                          <Text fontSize="sm">{address.line1}</Text>
                          {address.line2 ? <Text fontSize="sm">{address.line2}</Text> : null}
                          <Text fontSize="sm">
                            {address.zip} {address.city}
                          </Text>
                          <Text fontSize="sm">{address.state}</Text>
                        </div>

                        <div>
                          <Text fontSize="sm" fontWeight="bold">
                            {address.email}
                          </Text>
                          <Text fontSize="sm" fontWeight="bold">
                            {address.phoneNumber}
                          </Text>
                        </div>
                      </div>
                      <AddressCardButtons>
                        <Tooltip label="Edit address">
                          <Button colorScheme="blue" size="sm">
                            <Edit style={{ transform: "scale(0.8)" }} />
                          </Button>
                        </Tooltip>

                        <Tooltip label="Delete address">
                          <Button colorScheme="red" size="sm">
                            <Trash2 style={{ transform: "scale(0.9)" }} />
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
