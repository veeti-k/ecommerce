import { Button, Tooltip } from "@chakra-ui/react";
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
import { Heading, Paragraph } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { styled } from "../../stitches.config";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";
import toast from "react-hot-toast";
import { getMe } from "../../utils/logout";

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

  const { state, dispatch } = useContext(UserContext);

  const revokeSession = async (sessionId: string) => {
    const notifId = toast.loading("Revoking the session");
    const res = await request({
      method: "DELETE",
      path: apiRoutes.user.sessions.session("me", sessionId),
    });

    toast.dismiss(notifId);

    if (res) {
      toast.success("Session revoked");
      getMe(dispatch);
    }
  };

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
                  <div>
                    <Heading>Sessions</Heading>
                    <Paragraph light>Manage your sessions</Paragraph>
                  </div>
                </TitleContainer>

                <TestDiv>
                  {state.sessions.map((session) => {
                    const lastUsedAt = new Date(session.lastUsedAt);

                    return (
                      <SessionCard key={session.id}>
                        <div>
                          <FlexDiv gap05 align>
                            {session.isCurrentSession ? (
                              <Tooltip label="Current session">
                                <PulsingCircle />
                              </Tooltip>
                            ) : null}
                            <Paragraph bold>123.321.123.321</Paragraph>
                          </FlexDiv>

                          <Tooltip label="Last used at">
                            <Paragraph light>
                              {lastUsedAt.toLocaleDateString()} - {lastUsedAt.toLocaleTimeString()}
                            </Paragraph>
                          </Tooltip>
                        </div>

                        <SessionCardButtons>
                          <Tooltip label="Revoke session">
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => revokeSession(session.id)}
                            >
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
