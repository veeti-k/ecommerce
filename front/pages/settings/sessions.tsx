import { Button, Text, Tooltip } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";
import { Card } from "../../components/Card";
import { FlexDiv } from "../../components/Containers";
import { TrashIcon } from "../../components/Icons";
import { Layout } from "../../components/layouts/Layout";
import {
  Content,
  MainGrid,
  PageSelectorButtons,
  TempCard,
  TitleAndLogout,
  TitleContainer,
} from "../../components/pages/Settings";
import { PulsingCircle } from "../../components/pulsingCircle";
import { GlobalStateContext } from "../../globalState/store";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { styled } from "../../stitches.config";

const SessionCard = styled(Card, {
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
  padding: "1rem",
});

const SessionCardButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const TestDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Sessions: NextPage = () => {
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
              <PageSelectorButtons activePage="sessions" />
              <Content>
                <TitleContainer>
                  <Text fontWeight="bold">Sessions</Text>
                  <Text fontWeight="light" fontSize="sm">
                    Manage your sessions
                  </Text>
                </TitleContainer>

                <TestDiv>
                  {state.user?.sessions.map((session) => {
                    const lastUsedAt = new Date(session.lastUsedAt);

                    return (
                      <SessionCard>
                        <div>
                          <FlexDiv gap05 align>
                            {session.isCurrentSession ? (
                              <Tooltip label="Current session">
                                <PulsingCircle />
                              </Tooltip>
                            ) : null}
                            <Text fontWeight="bold">123.321.123.321</Text>
                          </FlexDiv>

                          <Tooltip label="Last used at">
                            <Text fontWeight="light" fontSize="sm">
                              {lastUsedAt.toLocaleDateString()} - {lastUsedAt.toLocaleTimeString()}
                            </Text>
                          </Tooltip>
                        </div>

                        <SessionCardButtons>
                          <Tooltip label="Revoke session">
                            <Button size="sm" colorScheme="red">
                              <TrashIcon />
                            </Button>
                          </Tooltip>
                        </SessionCardButtons>
                      </SessionCard>
                    );
                  })}
                </TestDiv>
              </Content>
            </MainGrid>
          </TempCard>
        </>
      ) : null}
    </Layout>
  );
};

export default Sessions;
