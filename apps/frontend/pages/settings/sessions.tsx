import { IconButton, Tooltip } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useContext } from "react";
import { Card, CardContent } from "../../components/Card";
import { CardWrapper, FlexDiv } from "../../components/Containers";
import { TrashIcon } from "../../components/Icons";
import { PulsingCircle } from "../../components/pulsingCircle";
import { Heading, Text } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { styled } from "../../stitches.config";
import toast from "react-hot-toast";
import { getMe } from "../../utils/logout";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { RevokeSessionRequest } from "../../utils/Requests/Session";
import { ResolvedCategory } from "../../types/Category";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";

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

const Sessions: NextPage<Props> = ({ resolvedCategories }) => {
  const { state, dispatch } = useContext(UserContext);

  const revokeSession = async (sessionId: string) => {
    const notifId = toast.loading("Revoking the session");
    const res = await RevokeSessionRequest(sessionId);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Session revoked");
      getMe(dispatch);
    }
  };

  return (
    <SettingsPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <Heading>Sessions</Heading>
      </TitleContainer>

      <CardWrapper scrollableMaxHeigth="calc(100vh - 15rem)">
        <CardContent>
          <FlexDiv column gap05>
            {state.sessions.map((session) => {
              const lastUsedAt = new Date(session.lastUsedAt);

              return (
                <SessionCard key={session.sessionId}>
                  <div>
                    <FlexDiv gap05 align>
                      {session.isCurrentSession ? (
                        <Tooltip label="Current session">
                          <PulsingCircle />
                        </Tooltip>
                      ) : null}
                      <Text bold>123.321.123.321</Text>
                    </FlexDiv>

                    <Tooltip label="Last used at">
                      <Text light>
                        {lastUsedAt.toLocaleDateString()} - {lastUsedAt.toLocaleTimeString()}
                      </Text>
                    </Tooltip>
                  </div>

                  <SessionCardButtons>
                    <Tooltip label="Revoke session">
                      <IconButton
                        aria-label="Revoke session"
                        size="sm"
                        colorScheme="red"
                        onClick={() => revokeSession(session.sessionId)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </Tooltip>
                  </SessionCardButtons>
                </SessionCard>
              );
            })}
          </FlexDiv>
        </CardContent>
      </CardWrapper>
    </SettingsPageLayout>
  );
};

export default Sessions;

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
